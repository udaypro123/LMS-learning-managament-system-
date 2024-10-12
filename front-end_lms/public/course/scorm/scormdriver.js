// SCORM driver for both SCORM 1.2 and SCORM 2004
var scormVersion = null;
var scormAPI = null;
var initialized = false;
var terminated = false;

// Utility function to detect which version of SCORM is being used
function getAPI() {
    if (scormAPI == null) {
        scormAPI = findAPI(window);
        if (!scormAPI) {
            scormAPI = findAPI(window.parent);
        }
    }
    return scormAPI;
}

function findAPI(win) {
    while (!win.API && win.parent && win.parent != win) {
        win = win.parent;
    }
    return win.API || win.API_1484_11;
}

// Initialize the SCORM session
function initialize() {
    if (!initialized) {
        scormAPI = getAPI();
        if (!scormAPI) {
            console.error("Unable to locate the SCORM API.");
            return false;
        }

        if (scormAPI.LMSInitialize) {
            scormVersion = "1.2";
            initialized = scormAPI.LMSInitialize("");
        } else if (scormAPI.Initialize) {
            scormVersion = "2004";
            initialized = scormAPI.Initialize("");
        }
    }
    return initialized;
}

// Terminate the SCORM session
function terminate() {
    if (!terminated) {
        if (scormVersion == "1.2") {
            terminated = scormAPI.LMSFinish("");
        } else if (scormVersion == "2004") {
            terminated = scormAPI.Terminate("");
        }
    }
    return terminated;
}

// Set a value in the LMS
function setValue(cmiName, value) {
    var success = false;
    if (scormVersion == "1.2") {
        success = scormAPI.LMSSetValue(cmiName, value);
    } else if (scormVersion == "2004") {
        success = scormAPI.SetValue(cmiName, value);
    }

    if (!success) {
        console.error("Error setting SCORM value.");
    }
    return success;
}

// Get a value from the LMS
function getValue(cmiName) {
    var value = null;
    if (scormVersion == "1.2") {
        value = scormAPI.LMSGetValue(cmiName);
    } else if (scormVersion == "2004") {
        value = scormAPI.GetValue(cmiName);
    }

    return value;
}

// Commit the data to the LMS
function commit() {
    var success = false;
    if (scormVersion == "1.2") {
        success = scormAPI.LMSCommit("");
    } else if (scormVersion == "2004") {
        success = scormAPI.Commit("");
    }

    if (!success) {
        console.error("Error committing SCORM data.");
    }
    return success;
}

// Report completion and success status to the LMS
function setCompletionStatus(status) {
    if (scormVersion == "1.2") {
        setValue("cmi.core.lesson_status", status);
    } else if (scormVersion == "2004") {
        setValue("cmi.completion_status", status);
    }
}
