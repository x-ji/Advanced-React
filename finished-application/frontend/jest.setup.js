// Adds DOM-related stuff to JEST
import "@testing-library/jest-dom";

// We run the tests in headless mode.
// Since we have window.alert somewhere in the codebase, we need to mock it out.
window.alert = console.log;
