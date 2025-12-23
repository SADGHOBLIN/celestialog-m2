// import displayMoonData to ensure an updated time/moon phase is displayed when creating a new note
import { displayMoonData } from "./moon.js";

// NOTES DATA helpers


// generates a unique timestamp at time of creation to be used as the unique Note ID
// represents the number of milliseconds since midnight Jan 1 1970 (Unix epoch)
function generateNoteId() {
    const timestamp = Date.now();
    return timestamp.toString();
}

/*  creates a timestamp for midnight UTC on that specific day,
    this is taken from the unique NOTE ID (unix epoch)
    which can be used to calculate exactly how many days have occurred between user notes (in days)
*/
function getDayOfNote(noteId) {
    const timestamp = new Date(Number(noteId));
    return Date.UTC(
        timestamp.getUTCFullYear(),
        timestamp.getUTCMonth(),
        timestamp.getUTCDate()
    );
}

// generates a missed journaling date from a placeholder note ID
function formatIdToDisplayDate(noteId) {
    const date = new Date(Number(noteId));
    return date.toDateString();
}


/*  formats user submitted note data into an object for the note array
    - id: UTC midnight timestamp, uniquely identifies notes for management and sorting
    - moon: represents moon phase at time of creation, influcences logic, styling and display
*/
function formatNoteData (noteId, title, date, moon, content) {
    return {
        id: noteId,
        title: title,
        date: date,
        moon: moon,
        content: content
    };
}

// formats placeholder data for missed journaling days ('Red Moons')
function createPlaceholderNoteData(missingId) {
    return {
        id: missingId,
        title: "Inkless interval",
        date: formatIdToDisplayDate(missingId),
        moon: "RED MOON",
        content: "A silent page..."
    };
}


// ensures notes object is up to date, and saved in localStorage
function updateNotesObject(newNotes, notes) {
    notes.userNotes = newNotes.userNotes;
    notes.recycleBin = newNotes.recycleBin;
    localStorage.setItem("notes", JSON.stringify(notes));
    return notes;
}

// returns a sorted notes object, sorting both the userNotes and recycleBin into descending order (newest notes first)
function sortNotes(notes) {
    notes.userNotes.sort((a,b ) => Number(b.id) - Number(a.id));
    notes.recycleBin.sort((a,b ) => Number(b.id) - Number(a.id));
    localStorage.setItem("notes", JSON.stringify(notes));
    return notes;
}


// creates a new formatted note and saves to localStorage, add new note to start of array
function saveNewNote(newNote, notes) {
    notes.userNotes.unshift(newNote);

    const savedMessage = document.createElement("p");
    const buttonsDiv = document.querySelector(".note-buttons");

    savedMessage.innerText = "Note saved!";
    savedMessage.classList.add("saved-notification");
    buttonsDiv.prepend(savedMessage);
    setTimeout(() => {
        savedMessage.remove();
    }, 2500);

    return sortNotes(notes);
}


function createNewNote(config, elements, notes, moonImages) {

    // safeguard against trying to create multiple new notes when UI is already empty
    if (!elements.noteEditor.dataset.noteId) {
        return;
    }

    checkSaveChanges(elements, notes, () => {
        clearNoteUI(config, elements, moonImages);
    });
}


// buffer check to ensure that user doesn't take actions and lose their unsaved progress
// only runs the check if they have ammended a saved note and not saved
function checkSaveChanges(elements, notes, nextAction) {

    const currentNoteId = elements.noteEditor.dataset.noteId;
    const currentTitle = elements.noteTitle.value;
    const currentMessage =  elements.noteContent.value;

    let isSaved = notes.userNotes.find( (note) => currentNoteId === note.id);

    // If no existing save note, safe to proceed
    if (!isSaved) {
        nextAction();
        return;
    }

    // if note exists but no data has been changed, safe to proceed
    if (currentTitle === isSaved.title && currentMessage === isSaved.content) {
        nextAction();
        return;
    }

    // if note exists, and some content has changed, display warning to user asking if they wish to save changes
    const userEntry = {
        id: currentNoteId,
        title: currentTitle,
        date: isSaved.date,
        moon: isSaved.moon,
        content: currentMessage
    };

    let saveChangesPrompt = "Do you wish to save changes?";
    displayOverrideCheck(userEntry, notes, elements, saveChangesPrompt, nextAction);
}


// saves over existing note data (only TITLE and CONTENT)
// updates existing notes array data, and saves to localStorage
function overrideNoteData(userEntry, notes) {

    // use the unique note ID to retrieve its index in array
    const index = notes.userNotes.findIndex( (note) => userEntry.id === note.id);

    // handle errors, if a user tries to save over a deleted note
    if (index < 0) {
        notes.userNotes.push(userEntry);
        return sortNotes(notes);
    }

    // override data
    notes.userNotes[index].title = userEntry.title;
    notes.userNotes[index].content = userEntry.content;

    const savedMessage = document.createElement("p");
    const buttonsDiv = document.querySelector(".note-buttons");

    savedMessage.innerText = "Note saved!";
    savedMessage.classList.add("saved-notification");
    buttonsDiv.prepend(savedMessage);
    setTimeout(() => {
        savedMessage.remove();
    }, 2500);

    return sortNotes(notes);
}


/*  handles deletion of notes
    find whether the note exists in the main notes array:
    - if it does not, delete the note permanantly,
    - if it does, remove and add to the recycle bin
*/
function deleteNoteData(noteId, notes) {
    const noteIndex = notes.userNotes.findIndex( (note) => note.id === noteId);

    // if findIndex on notes array returns -1, the note must be in the recycle bin
    // permanantly delete a note from the recycle bin
    if (noteIndex < 0) {
        const noteInBinIndex = notes.recycleBin.findIndex( (note) => note.id === noteId)
        notes.recycleBin.splice(noteInBinIndex, 1);
        return sortNotes(notes);
    }

    // else, delete note from main array but keep back up in recycle bin
    const noteToBin = notes.userNotes.find( (note) => note.id === noteId);
    notes.userNotes.splice(noteIndex, 1);
    notes.recycleBin.push(noteToBin);
    return sortNotes(notes);
}


// restore a previously deleted note in the correct order to the main notes array,
// and remove it from the recycle bin
function restoreDeletedNote(noteId, notes) {

    const noteToRestore = notes.recycleBin.find( (note) => note.id === noteId);
    const noteIndex = notes.recycleBin.findIndex ( (note) => note.id === noteId);

    notes.recycleBin.splice(noteIndex, 1);
    notes.userNotes.push(noteToRestore);

    return sortNotes(notes);
}


// checks whether at least one day has passed between user created notes,
// inidicating that they have 'missed a journaling day'
function checkForMissingDays(userNotes) {

    // safeguard that ensures notes are sorted in descending order
    userNotes.sort((a,b ) => Number(b.id) - Number(a.id));

    // nothing to fill
    if (userNotes.length <= 1) {
        return userNotes;
    }

    // store in a new array to avoid mutating original notes array
    const filledDays = [userNotes[0]];

    // push original notes into new array, inserting placeholders between user created notes
    for (let i = 0; i < userNotes.length - 1; i++) {
        const currentNote = userNotes[i];
        const nextNote = userNotes[i + 1];

        const currentDay = getDayOfNote(currentNote.id);
        const nextDay = getDayOfNote(nextNote.id);

        insertMissingDays(filledDays, currentDay, nextDay);
        filledDays.push(nextNote);
    }
    return filledDays;
}

// inserts placeholder notes into the notes array,
// stylised as 'Red Moons', which display to the user how many journaling days they have missed
function insertMissingDays(filledDays, currentDay, nextDay) {
    // calculate the number of days passed between two user created notes
    const msPerDay = 24 * 60 * 60 * 1000;
    const difInDays = Math.round((currentDay - nextDay) / msPerDay);

    if (difInDays <= 1) {
        return;
    }

    // insert new placeholder notes per day, up to the number of days between notes
    // calculate a placeholder ID by decreasing the current note ID by one day per gap
    for (let days = 1; days < difInDays; days++) {
        const missingId = (currentDay - (days * msPerDay)).toString();
        filledDays.push(createPlaceholderNoteData(missingId));
    }
}

//  NOTES UI helpers


// empty UI to allow for new note creation
// run displayMoonData to get up to date Date and Moon info
function clearNoteUI(config, elements, moonImages) {
    elements.noteEditor.dataset.noteId = "";
    elements.noteTitle.value = "";
    elements.noteDate.innerText = "";
    elements.noteMoon.innerText = "";
    elements.noteContent.value = "";
    displayMoonData(config, elements, moonImages);
}


// injects a user selected note's data into UI for user editing
function openSavedNote(noteId, notes, elements, moonImages) {
    const noteToOpen = notes.userNotes.find((note) => note.id === noteId);

    elements.noteEditor.dataset.noteId = noteToOpen.id;
    elements.noteTitle.value = noteToOpen.title;
    elements.noteDate.innerText = noteToOpen.date;
    elements.noteMoon.innerText = noteToOpen.moon;
    elements.noteContent.value = noteToOpen.content;

    const symbol = document.querySelector(".moon-symbol");
    symbol.src = moonImages[noteToOpen.moon].symbol;
    closeModal(elements);
}


//  displays a message, with buttons, in the DOM to check whether user wishes to overwrite their data
function displayOverrideCheck(userEntry, notes, elements, modalTitle, nextAction) {
    clearModalContent(elements);
    elements.modalTitle.innerText = modalTitle;
    
    //  create save button
    const saveBtn = createModalBtn("Save note", () => {
        updateNotesObject(overrideNoteData(userEntry, notes), notes);
        closeModal(elements);
        nextAction();
    })

    //  create cancel button
    const cancelBtn = createModalBtn("Cancel", () => {
        closeModal(elements);
        nextAction();
    })

    elements.modalBody.appendChild(saveBtn);
    elements.modalBody.appendChild(cancelBtn);
    elements.modalBody.classList.add("override-check");
    elements.modalFooter.classList.add("override-check");
    openModal(elements);
}


// create modal DOM element to display a saved note
function createNoteElement(note, elements, notes, state, arrayType, moonImages) {

    const noteElement = document.createElement("div");
    noteElement.id = `${note.id}`;
    noteElement.setAttribute("data-note-id", note.id);
    noteElement.classList.add("note");
    noteElement.innerHTML = `
        <div class="note-info">
                <h3 class="note-title">${note.title}</h3>
                <h4 class="note-date">${note.date}</h4>
                <h4 class="note-moon">${note.moon}</h4>
                <img class="moon-illustration-icon" src="${moonImages[note.moon].illustration}" alt="Illustration of a ${note.moon.toLowerCase()}">
        </div>`;

    // main action button, dependent on array,
    // user can either open a selected note from main array,
    //  or restore a deleted file from the recycle bin to the main array
    let mainBtn;

    if (arrayType === "userNotesArray") {
        mainBtn = createModalBtn("Open note", () => {
            checkSaveChanges(elements, notes, () => {
                openSavedNote(note.id, notes, elements, moonImages);
            });
        });
    }
    if (arrayType === "recycleBinArray") {
        mainBtn = createModalBtn("Restore note", () => {
            deleteNoteElement(note.id, elements);
            return updateNotesObject(restoreDeletedNote(note.id, notes), notes);
        })
    }

    // delete button, will either permanantly delete a note from recycle bin,
    // or remove the note from the main array and add to recycle bin
    const deleteNoteBtn = createModalBtn("Delete note", () => {
        deleteNoteElement(note.id, elements);
        return updateNotesObject(deleteNoteData(note.id, notes), notes);
    })

    // add .red-moon class to placeholder notes for styling and `display visibility` toggle
    if (note.moon === "RED MOON") {
        noteElement.classList.add("red-moon");

        if (!state.showRedMoons) {
            noteElement.classList.add("hidden");
        }
    }

    // attaches elements to DOM
    elements.modalBody.appendChild(noteElement);
    noteElement.appendChild(mainBtn);
    noteElement.appendChild(deleteNoteBtn);
}


// create modal message to inform user that no notes are currently saved
function createEmptyNotesMessage(elements, message) {
    const emptyMessage = document.createElement("div");
    emptyMessage.innerHTML = `
        <div class="note no-notes">
            <h3 class="note-title no-notes"
            >${message}</h3>
        </div>`;

    elements.modalBody.appendChild(emptyMessage);
}


// removes a note from the modal UI
function deleteNoteElement(noteId) {
    const noteToDelete = document.getElementById(noteId);
    noteToDelete.remove();
}


// toggle display of missed journaling days when user tries to view all notes
function toggleMissedDays(state) {
    const redMoons = document.querySelectorAll(".red-moon");
    state.showRedMoons = !state.showRedMoons;
    
    document.getElementById("toggle-missed-days").innerText = state.showRedMoons
    ? "Hide Missed Journaling Days"
    : "Show Missed Journaling Days";

    redMoons.forEach(note => {
        note.classList.toggle("hidden");
    })
    return state;
}

// MODAL HELPERS


// helper to open and close modal, displays saved notes to user
function openModal(elements) {
    elements.notesContainerModal.classList.add("active");
}

function closeModal(elements) {
    elements.notesContainerModal.classList.remove("active");
}

function clearModalContent(elements) {
    elements.modalTitle.innerText = "";
    elements.modalBody.innerHTML = "";
    elements.modalBody.classList = "";
    elements.modalFooter.classList = "";

    let missedDaysBtn = document.getElementById("toggle-missed-days");
    if (missedDaysBtn) {
        missedDaysBtn.remove();
    }
}

//  helper to create any buttons required for modal
//  attaches event listeners that await for user input
function createModalBtn(text, event) {
    const button = document.createElement("button");
    // TODO: unify css classes and add here
    button.innerText = text;
    button.addEventListener("click", event);
    return button;
}


// toggle between journal and advisor windows
function toggleHidden(elements, showID, hideID) {
    elements[showID].classList.remove("hidden");
    elements[hideID].classList.add("hidden");
}

// NOTES MAIN FUNCTIONS


// displays the most recent note to the user, if note is from today
function displayTodaysNote(elements, notes) {
    if (notes.userNotes.length === 0) {
        return;
    }

    const mostRecentNote = notes.userNotes[0];
    const today = elements.date.innerText;

    if (mostRecentNote.date === today) {
        elements.noteEditor.setAttribute("data-note-id", mostRecentNote.id);
        elements.noteTitle.value = mostRecentNote.title;
        elements.noteContent.value = mostRecentNote.content;
    }
}


/*  when user requests to save a note:
    - generate a unique ID for new notes, if one doesn't exist, or if note is in recycling bin
    - fetch rest of associated note data from the DOM,
    - format data, ready to be saved
    - check whether user is saving a new note, or overwriting an existing note
    - display an error message if user tries to save a blank note
*/
function captureUserEntry(elements, notes) {
    notes = sortNotes(notes);

    let noteId = elements.noteEditor.dataset.noteId;
    const isInRecycleBin = notes.recycleBin.find ( (note) => note.id === noteId);
    let isNewNote = false;
    
    if (!noteId || isInRecycleBin) {
        isNewNote = true;
        noteId = generateNoteId();
        elements.noteEditor.setAttribute("data-note-id", noteId);
    }

    const title = elements.noteTitle.value;
    const date = elements.noteDate.textContent;
    const moon = elements.noteMoon.textContent;
    const content = elements.noteContent.value;

    if (!elements.noteContent.value.trim()) {
        console.log("No data");
        const errorMessage = document.createElement("p");
        const buttonsDiv = document.querySelector(".note-buttons");

        errorMessage.innerText = "Cannot save a blank note";
        errorMessage.classList.add("error-notification");
        buttonsDiv.prepend(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, 3500);
        return;
    }

    const userEntry = formatNoteData(noteId, title, date, moon, content);

    if (isNewNote) {
        return updateNotesObject(saveNewNote(userEntry, notes), notes);
    }
    
    let overridePrompt = "Are you sure you want to overwrite your save?";
    displayOverrideCheck(userEntry, notes, elements, overridePrompt, () => closeModal(elements));
}


/*  when user requests to view their saved notes, either:
    - return an "Empty Notes" message, if there are currently no saved notes
    - or check the notes array and detect any gaps bewtween journaling days
    - if there are no gaps, display notes as is
    - or fill those gaps with placeholder notes ("Red Moons"), which indicate missed days to the user

    the notes are then displayed in a modal, that wait for the user to:
    - view a specific note, which is opened in the UI
    - delete note(s), which are removed from localStorage, note array, and the DOM
*/
function viewAllNotes(elements, notes, state, moonImages) {

    // safeguard to ensure notes array is up to date and in descending order
    notes = JSON.parse(localStorage.getItem("notes")) || { userNotes: [], recycleBin: [] };
    notes = sortNotes(notes);

    // clear modal container
    clearModalContent(elements);
    elements.modalTitle.innerText = "View Notes:";

    // show no notes if none saved
    if (notes.userNotes.length === 0) {
        createEmptyNotesMessage(elements, "You currently have no saved notes!");
        return openModal(elements);
    }

    // fill any missed journaling days with placeholder notes,
    // updates the notes array and saves the new notes data to localStorage
    notes.userNotes = checkForMissingDays(notes.userNotes);
    notes = sortNotes(notes);

    // create a DOM element for each saved note
    notes.userNotes.forEach( (note) => {
        createNoteElement(note, elements, notes, state, "userNotesArray", moonImages);
    });

    // add button that allows user to toggle display of missed journaling days
    const missedDaysBtn = document.createElement("button");
    missedDaysBtn.id = "toggle-missed-days";
    missedDaysBtn.innerText = state.showRedMoons ? "Hide Missed Journaling Days" : "Show Missed Journaling Days";
    missedDaysBtn.addEventListener("click", () => toggleMissedDays(state));
    elements.modalFooter.appendChild(missedDaysBtn);

    openModal(elements);
}

function viewRecycleBin(elements, notes, state, moonImages) {

    notes = JSON.parse(localStorage.getItem("notes")) || { userNotes: [], recycleBin: [] };
    notes = sortNotes(notes);

    clearModalContent(elements);
    elements.modalTitle.innerText = "Recycle Bin:";

    if (notes.recycleBin.length === 0) {
        createEmptyNotesMessage(elements, "Your recycle bin is empty");
        return openModal(elements);
    }

    notes.recycleBin.forEach( (note) => {
        createNoteElement(note, elements, notes, state, "recycleBinArray", moonImages);
    });
    openModal(elements);
}

// export functions
export { displayTodaysNote, captureUserEntry, createNewNote, viewAllNotes, viewRecycleBin, toggleHidden, closeModal };