// Import custom functions from other modules
import { displayMoonData } from "./moon.js";
import { sendMessage, cacheEngine } from "./advisor.js";
import { initialiseNote, captureUserEntry, viewAllNotes, toggleHidden, closeModal } from "./notes.js";

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
    viewNotesBtn: document.getElementById("view-notes"),
    closeModalBtn: document.getElementById("close-modal"),
    sendMsgBtn: document.getElementById("send-msg-btn"),

    // journal notes data
    noteForm: document.getElementById("note-form"),
    noteTitle: document.getElementById("note-title"),
    noteDate: document.getElementById("note-date"),
    noteMoon: document.getElementById("note-moon"),
    noteContent: document.getElementById("note-content"),

    // journal notes
    journal: document.getElementById("journal"),
    notesContainerModal: document.getElementById("notes-container-modal"),
    modalTitle: document.getElementById("modal-title"),
    notesContainer: document.getElementById("notes-container"),

    // advisor chat
    advisor: document.getElementById("advisor"),
    chatWindow: document.getElementById("chat-body"),
    userMsgInput: document.getElementById("user-msg-input"),
};
const state = {
    isWaitingForReply: false
}
let notes = JSON.parse(localStorage.getItem("notes")) || [];
const getEngine = cacheEngine();

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// DEBUGGING:
notes = [
    {
        id: "1761888000000",
        title: "THIS IS TODAY",
        date: "Fri Nov 28 2025",
        moon: "moon",
        content: "Filler content"
    },
    {
        id: "1761801600000",
        title: "THIS IS YESTERDAY",
        date: "Thu Nov 27 2025",
        moon: "moon",
        content: "Filler content"
    },
    {
        id: "1761532800000",
        title: "THIS IS MONDAY",
        date: "Mon Nov 24 2025",
        moon: "moon",
        content: "Filler content"
    },
]
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// JOURNAL FUNCTIONALITY - in development


// TOGGLE BETWEEN NOTES AND ADVISOR
elements.useAdvisor.addEventListener("click", () => {
    toggleHidden(elements, "advisor", "journal");
    elements.userMsgInput.focus();
});

elements.useJournal.addEventListener("click", () => {
    toggleHidden(elements, "journal", "advisor");
    elements.noteTitle.focus();
});


// SAVE NEW NOTE
elements.noteForm.addEventListener("submit", (e) => captureUserEntry(e, elements, notes));


// DISPLAY SAVED NOTES TO USER
elements.viewNotesBtn.addEventListener("click", () => viewAllNotes(elements, notes));


// Close modal with button, or click outside
elements.closeModalBtn.addEventListener("click", () => closeModal(elements));
elements.notesContainerModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal(elements);
    }
});

// ADVISOR FUNCTIONALITY
// handle messages sent into the chat by the user
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
await displayMoonData(config, elements);

initialiseNote(notes, elements);


// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// debugging - expose to console for now
window.notes = notes;

// debugging - delete notes from local storage
document.getElementById("clear-notes").addEventListener("click", () => {
    localStorage.removeItem("notes");
    notes = [];
    console.log("notes cleared");
});