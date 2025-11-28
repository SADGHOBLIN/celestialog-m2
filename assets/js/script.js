// Import custom functions from other modules
import { displayMoonData } from "./moon.js";
import { sendMessage, cacheEngine } from "./advisor.js";

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



// JOURNAL NOTES - IN DEVELOPMENT
// ------------------------------------------------------------------------------------------------------
// notes data functions
// ------------------------------------------------------------------------------------------------------

// check for gaps in journaling days, and fill in missing data
function checkDayGaps() {
    for (let index = 0; index < notes.length -1; index++) {
        const yesterday = isYesterday(index);

        // insert placeholder if needed
        if (!yesterday.isYesterday) {
            addPlaceholderDay(index, yesterday);
            console.log("gaps found!");
        }
    }
}

// check if previous note is from exactly yesterday
function isYesterday(index) {
    // get current and prev note dates, based on ID
    let noteDate = new Date(Number(notes[index].id));
    let prevNoteDate = new Date(Number(notes[index + 1].id));
    
    // check if prev note date is one day ago
    let trueYesterday = new Date(noteDate);
    trueYesterday.setDate(trueYesterday.getDate() - 1);

    return (prevNoteDate.toDateString() === trueYesterday.toDateString())
        ? { isYesterday: true }
        : { 
            isYesterday: false,
            placeholderDate: trueYesterday.toDateString(),
            placeholderID: trueYesterday.getTime().toString()
        };
}

// insert placeholder data into notes array for missing days
function addPlaceholderDay(index, yesterday) {
    // create RED MOON note that represents a missed journaling day
    const placeholderNote = {
        id: yesterday.placeholderID,
        title: "Placeholder title",
        date: yesterday.placeholderDate,
        moon: "RED MOON",
        content: ""
    };
    // insert into notes and save to local storage
    notes.splice(index + 1, 0, placeholderNote);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load selected saved note
function openSavedNote(noteId) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    const noteToOpen = notes[noteIndex];

    elements.noteForm.dataset.noteId = noteToOpen.id;
    elements.noteTitle.value = noteToOpen.title;
    elements.noteDate.innerText = noteToOpen.date;
    elements.noteMoon.innerText = noteToOpen.moon;
    elements.noteContent.value = noteToOpen.content;
    closeModal();
}

function deleteSavedNote(noteId) {
    // remove from modal
    const noteToDelete = document.getElementById(noteId);
    noteToDelete.remove();

    // remove from saved notes array
    const noteIndex = notes.findIndex( (note) => note.id === noteId);
    notes.splice(noteIndex, 1);

    // update notes in local storage
    localStorage.setItem("notes", JSON.stringify(notes));
}

function saveNote(e) {
    e.preventDefault();
    // get user inputted data
    const title = elements.noteTitle.value;
    const date = elements.noteDate.textContent;
    const moon = elements.noteMoon.textContent;
    const content = elements.noteContent.value;

    // set unique ID if this is a new note
    let noteId = elements.noteForm.dataset.noteId;
    if (!noteId) {
        noteId = Date.now().toString();
        elements.noteForm.setAttribute("data-note-id", noteId);
    }

    // check if ID matches existing note
    const existingNote = notes.find( (note) => note.id === noteId);

    // handle saving a new note
    if (!existingNote) {
        addNewNote({noteId, title, date, moon, content});
        return;
    }

    // handle existing note save override
    displayOverrideCheck();
}

// override existing save data
function overrideSave() {
    const noteId = elements.noteForm.dataset.noteId;
    const index = notes.findIndex( (note) => note.id === noteId);

    notes[index].title = elements.noteTitle.value;
    notes[index].content = elements.noteContent.value;
    localStorage.setItem("notes", JSON.stringify(notes));
}

// store data for new notes
function addNewNote({noteId, title, date, moon, content}) {
    const newNote = {
        id: noteId,
        title: title,
        date: date,
        moon: moon,
        content: content}

        notes.unshift(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
}

// ------------------------------------------------------------------------------------------------------
// notes visual functions
// ------------------------------------------------------------------------------------------------------

// toggle between journal and advisor windows
function toggleHidden(showID, hideID) {
    elements[showID].classList.remove("hidden");
    elements[hideID].classList.add("hidden");
}

// open and close modal, where notes are saved
function openModal() {
    elements.notesContainerModal.classList.add("active");
}
function closeModal() {
    elements.notesContainerModal.classList.remove("active");
}

// display today's note
function initialiseNote() {
    if (notes.length === 0) {
        return;
    }

    const mostRecentNote = notes[0];
    const today = elements.date.innerText;

    if (mostRecentNote.date === today) {
        elements.noteForm.setAttribute("data-note-id", mostRecentNote.id);
        elements.noteTitle.value = mostRecentNote.title;
        elements.noteContent.value = mostRecentNote.content;
    }
}

// view all saved notes
function viewAllNotes() {
    // show no notes if none saved
    elements.notesContainer.innerHTML = "";
    if (notes.length === 0) {
        createEmptyNotesMessage();
        return openModal();
    }

    // show first note
    if (notes.length === 1) {
        createNoteElement(notes[0]);
        return openModal();
    }

    checkDayGaps();
    formatSavedNotes();
    openModal();
}

// create a DOM element for each note
function formatSavedNotes() {
    // create note element for each saved note
    notes.forEach((note) => {
        createNoteElement(note);
    });
}

// display to user that no notes are currently saved
function createEmptyNotesMessage() {
    const emptyMessage = document.createElement("div");
    emptyMessage.innerHTML = `
        <div class="note">
            <h3 class="note-title"
            >You currently have no saved notes!</h3>
        </div>`;
    elements.notesContainer.appendChild(emptyMessage);
}

// create DOM element for a saved note
function createNoteElement(note) {
    const savedNote = document.createElement("div");
    savedNote.id = `${note.id}`;
    savedNote.setAttribute("data-note-id", note.id);
    savedNote.classList.add("note");
    savedNote.innerHTML = `
        <div class="note-info">
                <h3 class="note-title">${note.title}</h3>
                <h4 class="note-date">${note.date}</h4>
                <h4 class="note-moon">${note.moon}</h4>
        </div>`;

    const openNoteBtn = createModalBtn("Open note", () => {
        openSavedNote(note.id);
    })
    const deleteNoteBtn = createModalBtn("Delete note", () => {
        deleteSavedNote(note.id);
    })

    // add note to modal with open/delete buttons
    elements.notesContainer.appendChild(savedNote);
    savedNote.appendChild(openNoteBtn)
    savedNote.appendChild(deleteNoteBtn);
}


function displayOverrideCheck() {
    elements.notesContainer.innerHTML = "";
    elements.modalTitle.innerText = "Do you wish to override this save?";
    
    // create save button
    const saveBtn = createModalBtn("Save note", () => {
        overrideSave();
        closeModal();
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(saveBtn);

    //create cancel button
    const cancelBtn = createModalBtn("Cancel", () => {
        closeModal();
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(cancelBtn);

    openModal();
}

// create modal buttons
function createModalBtn(text, event) {
    const button = document.createElement("button");
    // TODO: unify css classes and add here
    button.innerText = text;
    button.addEventListener("click", event);
    return button;
}



// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// JOURNAL FUNCTIONALITY - in development

// Toggle between journal entries and advisor chat
elements.useAdvisor.addEventListener("click", () => {
    toggleHidden("advisor", "journal");
    elements.userMsgInput.focus();
});
elements.useJournal.addEventListener("click", () => {
    toggleHidden("journal", "advisor");
});

// NOTES FUNCTIONALITY - in dev
// Save new note
elements.noteForm.addEventListener("submit", saveNote);
// View all notes, open modal
elements.viewNotesBtn.addEventListener("click", viewAllNotes);
// Close modal with button, or click outside
elements.closeModalBtn.addEventListener("click", closeModal);
elements.notesContainerModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
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

initialiseNote();


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