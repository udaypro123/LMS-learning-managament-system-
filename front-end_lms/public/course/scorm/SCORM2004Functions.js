import { initialize, terminate, getValue, setValue, commit } from './APIWrapper.js';

// Function to initialize the SCORM course
function initializeCourse() {
    const result = initialize();
    if (result === "true") {
        console.log("SCORM Initialized successfully.");
        // Set initial values, like course status
        setValue("cmi.completion_status", "incomplete");
        commit();
    } else {
        console.error("Failed to initialize SCORM.");
    }
}

// Function to end the SCORM session
function endCourse() {
    // Set exit status before terminating
    setValue("cmi.exit", "suspend");
    commit();

    const result = terminate();
    if (result === "true") {
        console.log("SCORM session terminated.");
    } else {
        console.error("Failed to terminate SCORM session.");
    }
}

// Function to track completion status
function setLessonStatus(status) {
    if (setValue("cmi.completion_status", status) === "true") {
        commit();
        console.log(`Lesson status set to ${status}`);
    } else {
        console.error("Failed to set lesson status.");
    }
}

export { initializeCourse, endCourse, setLessonStatus };
