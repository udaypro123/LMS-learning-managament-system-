// APIWrapper.js - SCORM 2004 API Wrapper

// Constants for SCORM 2004
const SCORM_TRUE = "true";
const SCORM_FALSE = "false";
const SCORM_NO_ERROR = "0";

// API variables
let scormAPI = null;
let initialized = false;
let terminated = false;

// Utility function to find the SCORM API
function getAPI(win) {
    while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win)) {
        win = win.parent;
    }
    return win.API_1484_11;
}

// Function to initialize communication with the LMS
function initialize() {
    if (initialized || terminated) {
        console.warn("SCORM: Already initialized or terminated.");
        return SCORM_FALSE;
    }

    scormAPI = getAPI(window);
    if (scormAPI == null) {
        console.error("SCORM API not found.");
        return SCORM_FALSE;
    }

    let result = scormAPI.Initialize("");
    if (result === SCORM_FALSE) {
        console.error("SCORM: Initialization failed.");
        return SCORM_FALSE;
    }

    initialized = true;
    return SCORM_TRUE;
}

// Function to terminate communication with the LMS
function terminate() {
    if (!initialized || terminated) {
        console.warn("SCORM: Not initialized or already terminated.");
        return SCORM_FALSE;
    }

    let result = scormAPI.Terminate("");
    if (result === SCORM_FALSE) {
        console.error("SCORM: Termination failed.");
        return SCORM_FALSE;
    }

    terminated = true;
    return SCORM_TRUE;
}

// Function to get a value from the LMS
function getValue(element) {
    if (!initialized) {
        console.warn("SCORM: Not initialized. Cannot get value.");
        return "";
    }

    let value = scormAPI.GetValue(element);
    let errorCode = scormAPI.GetLastError();

    if (errorCode !== SCORM_NO_ERROR) {
        console.error(`SCORM GetValue Error: ${scormAPI.GetErrorString(errorCode)}`);
        return "";
    }

    return value;
}

// Function to set a value in the LMS
function setValue(element, value) {
    if (!initialized) {
        console.warn("SCORM: Not initialized. Cannot set value.");
        return SCORM_FALSE;
    }

    let result = scormAPI.SetValue(element, value);
    if (result === SCORM_FALSE) {
        let errorCode = scormAPI.GetLastError();
        console.error(`SCORM SetValue Error: ${scormAPI.GetErrorString(errorCode)}`);
        return SCORM_FALSE;
    }

    return SCORM_TRUE;
}

// Function to commit data to the LMS
function commit() {
    if (!initialized) {
        console.warn("SCORM: Not initialized. Cannot commit.");
        return SCORM_FALSE;
    }

    let result = scormAPI.Commit("");
    if (result === SCORM_FALSE) {
        let errorCode = scormAPI.GetLastError();
        console.error(`SCORM Commit Error: ${scormAPI.GetErrorString(errorCode)}`);
        return SCORM_FALSE;
    }

    return SCORM_TRUE;
}

// Function to get the last error code from the LMS
function getLastError() {
    return scormAPI.GetLastError();
}

// Function to get the error string from an error code
function getErrorString(errorCode) {
    return scormAPI.GetErrorString(errorCode);
}

// Function to get diagnostic information from the LMS
function getDiagnosticInfo(errorCode) {
    return scormAPI.GetDiagnostic(errorCode);
}

// Exporting functions to be used externally
export {
    initialize,
    terminate,
    getValue,
    setValue,
    commit,
    getLastError,
    getErrorString,
    getDiagnosticInfo
};
