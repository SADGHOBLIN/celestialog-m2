// Import custom functions from other modules
import { displayMoonData } from "./moon.js";
import { sendMessage, cacheEngine, chooseAdvisorCard, updateDeckName } from "./advisor.js";
import { initNotes, displayTodaysNote, captureUserEntry, createNewNote, viewAllNotes, viewRecycleBin, toggleHidden, closeModal } from "./notes.js";
// ------------------------------------------------------------------------------------------------------
// CONFIG
const config = {
    /*  api key is exposed, but this is a free plan with a daily limit.
        securing the api key is beyond the scope of this project, and the
        risk of this particular exposed key within this context is low.
    */
    API_KEY: "1cd00c803c544f90b75357b117b4c27a",
    API_URL: "https://api.ipgeolocation.io/v2/astronomy",
    DATA_EXPIRY_HOURS: 12,
    MODELS: {
        defaultModel: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
        mobileModel: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    }
};
const elements = {
    // buttons
    useJournal: document.getElementById("use-journal"),
    useAdvisor: document.getElementById("use-advisor"),
    saveNoteBtn: document.getElementById("save-note"),
    createNoteBtn: document.getElementById("create-note"),
    viewNotesBtn: document.getElementById("view-notes"),
    viewRecycleBtn: document.getElementById("view-recycle-bin"),
    closeModalBtn: document.getElementById("close-modal"),
    sendMsgBtn: document.getElementById("send-msg-btn"),

    // journal notes interface
    noteEditor: document.getElementById("note-editor"),
    noteTitle: document.getElementById("note-title"),
    noteDate: document.getElementById("note-date"),
    noteMoon: document.getElementById("note-moon"),
    noteContent: document.getElementById("note-content"),

    // advisor chat interface
    advisor: document.getElementById("advisor"),
    chatWindow: document.getElementById("chat-body"),
    userMsgInput: document.getElementById("user-msg-input"),
    deck: document.getElementById("deck"),
    deckInstruction: document.querySelector(".deck__instruction"),
    advisorName: document.getElementById("advisor-name"),

    // moon information
    date: document.getElementById("current-date-data"),
    moonPhase: document.getElementById("moon-phase-data"),
    moonVisibility: document.getElementById("moon-visibility-data"),

    // journal notes modal
    journal: document.getElementById("journal"),
    notesContainerModal: document.getElementById("notes-container-modal"),
    modalElement: document.getElementById("modal-element"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    modalFooter: document.getElementById("modal-footer"),
};
const state = {
    isWaitingForReply: false,
    showRedMoons: true,
    showMissedDays: true,
    isDeckIdle: true,
    currentAdvisor: "",
    currentCard: null,
};
const moonImages = {
    "NEW MOON": {
        symbol: "assets/images/moon/new-moon-symbol.svg",
        illustration: "assets/images/moon/new-moon.webp",
    },
    "WANING CRESCENT": {
        symbol: "assets/images/moon/waning-crescent-symbol.svg",
        illustration: "assets/images/moon/waning-crescent.webp",
    },
    "LAST QUARTER": {
        symbol: "assets/images/moon/last-quarter-symbol.svg",
        illustration: "assets/images/moon/last-quarter.webp",
    },
    "WANING GIBBOUS": {
        symbol: "assets/images/moon/waning-gibbous-symbol.svg",
        illustration: "assets/images/moon/waning-gibbous.webp",
    },
    "FULL MOON": {
        symbol: "assets/images/moon/full-moon-symbol.svg",
        illustration: "assets/images/moon/full-moon.webp",
    },
    "WAXING GIBBOUS": {
        symbol: "assets/images/moon/waxing-gibbous-symbol.svg",
        illustration: "assets/images/moon/waxing-gibbous.webp",
    },
    "FIRST QUARTER": {
        symbol: "assets/images/moon/first-quarter-symbol.svg",
        illustration: "assets/images/moon/first-quarter.webp",
    },
    "WAXING CRESCENT": {
        symbol: "assets/images/moon/waxing-crescent-symbol.svg",
        illustration: "assets/images/moon/waxing-crescent.webp",
    },
    "RED MOON": {
        symbol: "assets/images/moon/red-moon-symbol.svg",
        illustration: "assets/images/moon/red-moon.webp",
    },
};
// fetch user notes from localStorage (if any), or create empty object to store data
let notes = initNotes();
// create the webLLM engine: prepares to load LLM if user initiates by sending a message
const getEngine = cacheEngine();

// ------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
// Toggle between primary journal functions: NOTES and ADVISOR CHAT
elements.useAdvisor.addEventListener("click", () => {
    toggleHidden(elements, "advisor", "noteEditor");
    elements.userMsgInput.focus();
});
elements.useJournal.addEventListener("click", () => {
    toggleHidden(elements, "noteEditor", "advisor");
    elements.noteTitle.focus();
});

// Notes Functionality
// save new note
elements.saveNoteBtn.addEventListener("click", () => captureUserEntry(elements, notes));

// create new note
elements.createNoteBtn.addEventListener("click", () => createNewNote(config, elements, notes, moonImages));

// display saved notes (open modal)
elements.viewNotesBtn.addEventListener("click", () => viewAllNotes(elements, notes, state, moonImages));

// display recycle bin (open modal)
elements.viewRecycleBtn.addEventListener("click", () => viewRecycleBin(elements, notes, state, moonImages));

// close modal
elements.closeModalBtn.addEventListener("click", () => closeModal(elements));
elements.notesContainerModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal(elements);
    }
});

// Advisor functionality
/*  submit user inputted messages to webLLM engine (triggered by button press, or pressing Enter on keyboard):
    - checks the user has selected a tarot advisor
    - disables user input whilst waiting for a response
    - returns the response to the chat window for the user
*/
elements.userMsgInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (state.isWaitingForReply) {
            return;
        }
        sendMessage(getEngine, config, elements, state);
    }
});
elements.sendMsgBtn.addEventListener("click", () => {
    sendMessage(getEngine, config, elements, state);
});

// displays hints to the user within the chat input box, indicating the user can type ">" to see a list of help commands
elements.userMsgInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value === ">" && elements.userMsgInput.selectionStart === value.length) {
        document.getElementById("command-hint").classList.add("visible");
    } else {
        document.getElementById("command-hint").classList.remove("visible");
    }
});

// animate tarot cards on load
window.addEventListener("load", () => {
    document.querySelectorAll(".card").forEach(card => {

        card.classList.add("is-loaded");

        // add hitbox to cards, which trigger user selection and updates in DOM
        const hitbox = card.querySelector(".card-hitbox");
        hitbox.addEventListener("click", () => {
            chooseAdvisorCard(card, elements, state);
            updateDeckName(state, elements);
        });
    });
});

// ------------------------------------------------------------------------------------------------------
// INITIALISE
// pull moon data from api and display today's moon information to user
await displayMoonData(config, elements, moonImages);

// preloads the user's most recent note, if the note is from today
displayTodaysNote(elements, notes);