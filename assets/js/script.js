// AI language models and engine from WebLLM (MLC AI) & Astronomy API from IPGeolocation
// IMPORT engine from WebLLM
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

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
// Define initial language model persona
const messages = [
    { 
        role: "system", 
        content: 
        "You are Architect; the cryptic and mysterious advisor to the user that helps them with creative writing in their journal. You act as a member of their advisory council, similar to the councils of the medieval period. Your responses should answer the user's questions, but you can also be cryptic and poetic, and aimed at providing them with thought provoking responses to aid them in their daily reflection, and creativity." 
    },
    { 
        role: "user", 
        content: 
        "Hello, can you tell me what I could write about in my journal today? Just a short idea to help me get my brain working." 
    },
];
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// HELPERS ------------------------------

// WEBLLM helpers
// store language model engine, or create a new engine instance
function cacheEngine() {
    let cachedEngine = null;

    return async function getEngine() {
        return cachedEngine
            ? cachedEngine
            : cachedEngine = await createEngine();
    };
}

async function createEngine() {
    const engine = await CreateMLCEngine(config.MODELS.defaultModel, {
        initProgressCallback: (progress) => {
            console.log("loading:", progress.progress);
        }
    });
    console.log("Model loading complete");
    return engine;
}

// submit user inputted message to the language model and await a reply
async function getReply (userText) {
    const engine = await getEngine();
    
    const reply = await engine.chat.completions.create({
        messages: [
            ...messages,
            { role: "user", content: userText }
        ],
        temperature: 1.0,
    });
    return reply.choices[0].message.content;
}

// fill advisor chat window with appropriate messages
function createChatBubble(classList, message) {
    const newMessage = document.createElement("div");

    if (Array.isArray(classList)) {
        newMessage.classList.add(...classList);
    } else {
        newMessage.classList.add(classList);
    }
    newMessage.textContent = message;
    
    elements.chatWindow.appendChild(newMessage);
    scrollSmooth(elements.chatWindow);
    return newMessage;
}

// scroll smoothly to target location
function scrollSmooth(scrollToLocation) {
    scrollToLocation.scrollTo({
        top: scrollToLocation.scrollHeight,
        behavior: "smooth"
    });
}

// MOON API HELPERS
// load API data from local storage and check freshness, or GET new fresh data
async function getMoonData() {
    const savedData = localStorage.getItem("astronomyData");

    if (!savedData) {
        return await saveAstronomyData();
    }

    const payload = JSON.parse(savedData);
    return isDataFresh(payload)
        ? payload
        : await saveAstronomyData();
}

// get astronomy data from API and save to local storage
async function saveAstronomyData() {
    let city = "Leeds%2C%20UK";
    const queryString = `${config.API_URL}?apiKey=${config.API_KEY}&location=${city}`;

    const response = await fetch(queryString);
    const data = await response.json();
    
    if (response.ok) {
        const payload = {
            moonData: data,
            timestamp: Date.now()
        };
        localStorage.setItem("astronomyData", JSON.stringify(payload));
        console.log("Data successfully saved to local storage");
        return payload;
    } else {
        const errorMessage = data.message || data.error || "Unknown API error";
        throw new Error(errorMessage);
    }
}

// check if data is from same date, and less than 12 hours old
function isDataFresh(payload) {
    const age = Date.now() - payload.timestamp;
    const expiryTime = config.DATA_EXPIRY_HOURS * 60 * 60 * 1000;
    const dataDate = new Date(payload.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    return age <= expiryTime && dataDate === currentDate;
}

// convert API data into a readable format
function formatMoonData(currentPhase) {
    return currentPhase
        .toLowerCase()
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

// check moon visibility based on moonrise and moonset data (HHMM format)
function checkMoonVisibility(today, moonrise, moonset) {
    const now = today.getHours() * 100 + today.getMinutes();
    const [rh, rm] = moonrise.split(":").map(Number);
    const [sh, sm] = moonset.split(":").map(Number);

    const rise = rh * 100 + rm;
    const set = sh * 100 + sm;

    return rise > set
        ? now >= rise || now <= set
        : now >= rise && now <= set;
}

// Toggle visibility
function toggleHidden(showID, hideID) {
    elements[showID].classList.remove("hidden");
    elements[hideID].classList.add("hidden");
}

// FEATURES ------------------------------
// MOON API
async function displayMoonData() {
    let payload = await getMoonData();

    // moon info variables
    const today = new Date(payload.timestamp);
    const moonData = payload.moonData;
    const moonPhase = formatMoonData(moonData.astronomy.moon_phase);
    const moonrise = moonData.astronomy.moonrise;
    const moonset = moonData.astronomy.moonset;

    // display current moon phase
    elements.moonPhase.innerText = moonPhase;
    elements.noteMoon.innerText= `Moon: ${moonPhase.toUpperCase()}`;

    // display current date
    elements.date.innerText = today.toDateString();
    elements.noteDate.innerText = today.toDateString();

    // display moon visibility
    const isVisible = checkMoonVisibility(today, moonrise, moonset);

    elements.moonVisibility.innerHTML = isVisible
        ? `<p id="moon-visibility">VISIBLE<br>${moonrise} - ${moonset}</p>`
        : `<p id="moon-visibility">Moonrise:<br>${moonrise}</p>`;
    

    // DEBUGGING:
    console.log(payload);
}

// WEBLLM
async function sendMessage() {
    // return if message is blank
    const message = elements.userMsgInput.value.trim();
    if (!message) {
        return;
    }

    // clear input box, and stop using sending new messages until reply is received
    elements.userMsgInput.value = "";
    isWaitingForReply = true;
    elements.sendMsgBtn.disabled = true;

    try {
        createChatBubble("user-msg", message);
        const advisor = createChatBubble(["advisor-msg", "loading"], "Advisor is thinking...");
        const reply = await getReply(message);
        advisor.textContent = reply;
        advisor.classList.remove("loading");

    } catch (error) {
        console.error("Failed to get a reply:", error);
        createChatBubble("advisor-msg", error.message);

    } finally {
        // enable user input again
        isWaitingForReply = false;
        elements.sendMsgBtn.disabled = false;
        elements.userMsgInput.focus();
        scrollSmooth(elements.chatWindow);
    }
}


// JOURNAL NOTES - IN DEVELOPMENT
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

// open and close modal, where notes are saved
function openModal() {
    elements.notesContainerModal.classList.add("active");
}
function closeModal() {
    elements.notesContainerModal.classList.remove("active");
}

function viewAllNotes() {
    // show no notes if none saved
    elements.notesContainer.innerHTML = "";
    if (notes.length === 0) {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `
        <div class="note">
            <h3 class="note-title"
            >Currently there are no saved notes!</h3>
        </div>`;
        elements.notesContainer.appendChild(noteElement);
        return openModal();
    }
    // display all saved notes
    formatSavedNotes();
    openModal();
}

function formatSavedNotes() {
    // create note element for each saved note
    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.id = `${note.id}`;
        noteElement.setAttribute("data-note-id", note.id);
        noteElement.classList.add("note");
        noteElement.innerHTML = `
        <div class="note-info">
                <h3 class="note-title">${note.title}</h3>
                <h4 class="note-date">${note.date}</h4>
                <h4 class="note-moon">${note.moon}</h4>
        </div>`;

        const openNoteBtn = document.createElement("button");
        openNoteBtn.innerText = "Open note";
        openNoteBtn.addEventListener("click", () => {
            openSavedNote(note.id);
        });

        const deleteNoteBtn = document.createElement("button");
        deleteNoteBtn.innerText = "Delete note";
        deleteNoteBtn.addEventListener("click", () => {
            deleteSavedNote(note.id);
        });
        
        // add note to modal with open/delete buttons
        elements.notesContainer.appendChild(noteElement);
        noteElement.appendChild(openNoteBtn)
        noteElement.appendChild(deleteNoteBtn);
    });
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

    // new note
    if (!existingNote) {
        addNewNote({noteId, title, date, moon, content});
        return;
    }

    // existing note
    displayOverrideCheck();
}

function displayOverrideCheck() {
    elements.notesContainer.innerHTML = "";
    elements.modalTitle.innerText = "Do you wish to override this save?";
    
    // create save button
    const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save note";
    saveBtn.addEventListener("click", () => {
        overrideSave();
        closeModal();
        elements.modalTitle.innerText = "Select note";
    });
    elements.notesContainer.appendChild(saveBtn);

    //create cancel button
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => {
        closeModal();
        elements.modalTitle.innerText = "Select note";
    });
    elements.notesContainer.appendChild(cancelBtn);

    openModal();
}

function overrideSave() {
    const noteId = elements.noteForm.dataset.noteId;
    const index = notes.findIndex( (note) => note.id === noteId);

    notes[index].title = elements.noteTitle.value;
    notes[index].content = elements.noteContent.value;
    localStorage.setItem("notes", JSON.stringify(notes));
}

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
elements.sendMsgBtn.addEventListener("click", sendMessage);
elements.userMsgInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        if (isWaitingForReply) {
            event.preventDefault();
            return;
        }
        sendMessage();
    }
});

// INITIALISE ------------------------------
await displayMoonData();

const getEngine = cacheEngine();
let isWaitingForReply = false;

initialiseNote();



// debugging - expose to console for now
window.getEngine = getEngine;
window.notes = notes;

// debugging - delete notes from local storage
document.getElementById("clear-notes").addEventListener("click", () => {
    localStorage.removeItem("notes")
    notes = [];
    console.log("notes cleared");
});