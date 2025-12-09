// Import custom functions from other modules
import { displayMoonData } from "./moon.js";
import { sendMessage, cacheEngine } from "./advisor.js";
import { displayTodaysNote, captureUserEntry, createNewNote, viewAllNotes, viewRecycleBin, toggleHidden, closeModal } from "./notes.js";

// CONFIG
const config = {
    API_KEY: "1cd00c803c544f90b75357b117b4c27a",
    API_URL: "https://api.ipgeolocation.io/v2/astronomy",
    DATA_EXPIRY_HOURS: 12,
    MODELS: {
        defaultModel: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
        mobileModel: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
        experimentalModel: "NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC"
    }
};
const elements = {
    // moon information
    date: document.getElementById("current-date-data"),
    moonPhase: document.getElementById("moon-phase-data"),
    moonVisibility: document.getElementById("moon-visibility-data"),

    // buttons
    useJournal: document.getElementById("use-journal"),
    useAdvisor: document.getElementById("use-advisor"),
    saveNoteBtn: document.getElementById("save-note"),
    createNoteBtn: document.getElementById("create-note"),
    viewNotesBtn: document.getElementById("view-notes"),
    viewRecycleBtn: document.getElementById("view-recycle-bin"),
    closeModalBtn: document.getElementById("close-modal"),
    sendMsgBtn: document.getElementById("send-msg-btn"),

    // journal notes form data
    noteForm: document.getElementById("note-form"),
    
    noteTitle: document.getElementById("note-title"),
    noteDate: document.getElementById("note-date"),
    noteMoon: document.getElementById("note-moon"),
    noteContent: document.getElementById("note-content"),

    // journal notes modal
    journal: document.getElementById("journal"),
    notesContainerModal: document.getElementById("notes-container-modal"),
    modalElement: document.getElementById("modal-element"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    modalFooter: document.getElementById("modal-footer"),

    // advisor chat
    advisor: document.getElementById("advisor"),
    chatWindow: document.getElementById("chat-body"),
    userMsgInput: document.getElementById("user-msg-input"),
};
const state = {
    isWaitingForReply: false,
    showRedMoons: true,
    showMissedDays: true,

}
const getEngine = cacheEngine();
let notes = JSON.parse(localStorage.getItem("notes")) || {
    userNotes: [],
    recycleBin: [],
};

// DEBUGGING;
// note data for a day in the past, to test backfill functionality
// timestamp string for NOV 30 2025, UTC midnight
// {
//     id: "1764460800000",
//     title: "Debug Note",
//     date: "Sun Nov 30 2025",
//     moon: "WAXING CRESCENT",
//     content: "This is a test note for debugging."
// }



// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// JOURNAL FUNCTIONALITY - in development

// TOGGLE BETWEEN NOTES AND ADVISOR WINDOWS
elements.useAdvisor.addEventListener("click", () => {
    toggleHidden(elements, "advisor", "journal");
    elements.userMsgInput.focus();
});

elements.useJournal.addEventListener("click", () => {
    toggleHidden(elements, "journal", "advisor");
    elements.noteTitle.focus();
});


// SAVE NEW NOTE
elements.saveNoteBtn.addEventListener("click", () => captureUserEntry(elements, notes));


// CREATE NEW NOTE
elements.createNoteBtn.addEventListener("click", () => createNewNote(config, elements, notes));


// DISPLAY SAVED NOTES TO USER
elements.viewNotesBtn.addEventListener("click", () => viewAllNotes(elements, notes, state));


// DISPLAY RECYCLE BIN TO USER
elements.viewRecycleBtn.addEventListener("click", () => viewRecycleBin(elements, notes, state));


// CLOSE NOTES MODAL
elements.closeModalBtn.addEventListener("click", () => closeModal(elements));
elements.notesContainerModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal(elements);
    }
});


// ADVISOR FUNCTIONALITY

// HANDLE USER SUBMITTED MESSAGES
elements.sendMsgBtn.addEventListener("click", () => {
    sendMessage(getEngine, config, elements, state);
});

elements.userMsgInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        if (state.isWaitingForReply) {
            event.preventDefault();
            return;
        }
        sendMessage(getEngine, config, elements, state);
    }
});

// ------------------------------------------------------------------------------------------------------
// INITIALISE
// ------------------------------------------------------------------------------------------------------

// display moon data information to user
await displayMoonData(config, elements);

// fetch user notes and display, if note is from today
displayTodaysNote(elements, notes);


// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// debugging - delete all notes from local storage
// window.notes = notes;

// document.getElementById("clear-notes").addEventListener("click", () => {
//     localStorage.removeItem("notes");
//     notes = {
//         userNotes: [],
//         recycleBin: [],
//     }
//     window.notes = notes;
//     displayTodaysNote(elements, notes);
//     console.log("notes cleared");
// });