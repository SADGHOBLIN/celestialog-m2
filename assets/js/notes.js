// NOTES DATA helpers

/*  creates a timestamp for midnight UTC on that specific day,
    this is used as a unique NOTE ID,
    which can be used to calculate exactly how many days have occurred between user notes (in days)
*/
function generateNoteId() {
    const timestamp = new Date();
    return Date.UTC(
        timestamp.getUTCFullYear(),
        timestamp.getUTCMonth(),
        timestamp.getUTCDate()
    ).toString();
}


/*  formats user submitted note data into an object for the note array
    - id: UTC midnight timestamp, uniquely identifies notes for management and sorting
    - moon: represents moon phase at time of creation, influcences logic, styling and display
*/
function formatNoteData (noteId, title, date, moon, content) {
    return {
        id: noteId,
        title: title,
        date: date, // TODO: format date function
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

// generates a missed journaling date from a placeholder note ID
function formatIdToDisplayDate(noteId) {
    const date = new Date(Number(noteId));
    return date.toDateString();
}


// creates a new formatted note and saves to localStorage, add new note to start of array
function saveNewNote(newNote, notes) {
    notes.unshift(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
}


// saves over existing note data (only TITLE and CONTENT)
// updates existing notes array data, and saves to localStorage
function overrideNoteData(userEntry, notes) {

    // use the unique note ID to retrieve its index in array
    const index = notes.findIndex( (note) => userEntry.id === note.id);

    // override data
    notes[index].title = userEntry.title;
    notes[index].content = userEntry.content;
    localStorage.setItem("notes", JSON.stringify(notes));
}


// deletes a note from localStorage and notes array
function deleteNoteData(noteId, notes) {
    const noteIndex = notes.findIndex( (note) => note.id === noteId);
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
}


// checks whether at least one day has passed between user created notes,
// inidicating that they have 'missed a journaling day'
function checkForMissingDays(notes) {

    // safeguard that ensures notes are sorted in descending order
    notes.sort((a,b ) => Number(b.id) - Number(a.id));
    localStorage.setItem("notes", JSON.stringify(notes));

    // nothing to fill
    if (notes.length <= 1) {
        return notes;
    }

    // store in a new array to avoid mutating original notes array
    const filledDays = [notes[0]];

    // push original notes into new array, inserting placeholders between user created notes
    for (let i = 0; i < notes.length - 1; i++) {
        const currentNote = notes[i];
        const nextNote = notes[i + 1];

        const currentDay = Number(currentNote.id);
        const nextDay = Number(nextNote.id);

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

//  displays a message, with buttons, in the DOM to check whether user wishes to overwrite their data
function displayOverrideCheck(userEntry, notes, elements) {
    elements.notesContainer.innerHTML = "";
    elements.modalTitle.innerText = "Do you wish to override this save?";
    
    //  create save button
    const saveBtn = createModalBtn("Save note", () => {
        overrideNoteData(userEntry, notes);
        closeModal(elements);
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(saveBtn);

    //  create cancel button
    const cancelBtn = createModalBtn("Cancel", () => {
        closeModal(elements);
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(cancelBtn);

    openModal(elements);
}


// injects a user selected note's data into UI for user editing
function openSavedNote(noteId, notes, elements) {
    const noteToOpen = notes.find((note) => note.id === noteId);

    elements.noteForm.dataset.noteId = noteToOpen.id;
    elements.noteTitle.value = noteToOpen.title;
    elements.noteDate.innerText = noteToOpen.date;
    elements.noteMoon.innerText = noteToOpen.moon;
    elements.noteContent.value = noteToOpen.content;
    closeModal(elements);
}


// removes a note from the modal UI
function deleteNoteElement(noteId) {
    const noteToDelete = document.getElementById(noteId);
    noteToDelete.remove();
}


// create modal DOM element to display a saved note
function createNoteElement(note, notes, elements) {

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

    // create buttons that allow user to open a saved note, or delete a saved note
    const openNoteBtn = createModalBtn("Open note", () => {
        openSavedNote(note.id, notes, elements);
    })
    const deleteNoteBtn = createModalBtn("Delete note", () => {
        deleteNoteElement(note.id, elements);
        deleteNoteData(note.id, notes);
    })

    // add .red-moon class to placeholder notes for styling and `display visibility` toggle
    if (note.moon === "RED MOON") {
        savedNote.classList.add("red-moon");
    }

    // attaches elements to DOM
    elements.notesContainer.appendChild(savedNote);
    savedNote.appendChild(openNoteBtn)
    savedNote.appendChild(deleteNoteBtn);
}


// create modal message to inform user that no notes are currently saved
function createEmptyNotesMessage(elements) {
    const emptyMessage = document.createElement("div");
    emptyMessage.innerHTML = `
        <div class="note">
            <h3 class="note-title"
            >You currently have no saved notes!</h3>
        </div>`;

    elements.notesContainer.appendChild(emptyMessage);
}

// toggle display of missed journaling days when user tries to view all notes
function toggleMissedDays(elements, state) {
    const redMoons = document.querySelectorAll(".red-moon");
    state.showRedMoons = !state.showRedMoons;
    
    elements.toggleRedMoons.innerText = state.showRedMoons
    ? "Hide missed journaling days"
    : "Show missed journaling days";

    redMoons.forEach(note => {
        note.classList.toggle("hidden");
    })
}

// helper to open and close modal, displays saved notes to user
function openModal(elements) {
    elements.notesContainerModal.classList.add("active");
}
function closeModal(elements) {
    elements.notesContainerModal.classList.remove("active");
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
function initialiseNote(notes, elements) {
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

/*  when user requests to save a note:
    - generate a unique ID for new notes, if one doesn't exist,
    - fetch rest of associated note data from the DOM,
    - format data, ready to be saved
    - check whether user is saving a new note, or overwriting an existing note
*/
function captureUserEntry(e, elements, notes) {
    e.preventDefault();

    let noteId = elements.noteForm.dataset.noteId;
    let isNewNote = false;
    
    if (!noteId) {
        isNewNote = true;
        noteId = generateNoteId();
        elements.noteForm.setAttribute("data-note-id", noteId);
    }
    const title = elements.noteTitle.value;
    const date = elements.noteDate.textContent;
    const moon = elements.noteMoon.textContent;
    const content = elements.noteContent.value;

    const userEntry = formatNoteData(noteId, title, date, moon, content);

    if (isNewNote) {
        return saveNewNote(userEntry, notes);
    }
    displayOverrideCheck(userEntry,notes, elements);
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
function viewAllNotes(elements, notes) {

    // safeguard to ensure notes array is up to date
    notes = JSON.parse(localStorage.getItem("notes")) || [];

    // clear modal container
    elements.notesContainer.innerHTML = "";

    // show no notes if none saved
    if (notes.length === 0) {
        createEmptyNotesMessage(elements);
        return openModal(elements);
    }

    // fill any missed journaling days with placeholder notes,
    // updates the notes array and saves the new notes data to localStorage
    notes = checkForMissingDays(notes);
    localStorage.setItem("notes", JSON.stringify(notes));

    // create a DOM element for each saved note
    notes.forEach( (note) => {
        createNoteElement(note, notes, elements);
    });
    openModal(elements);
}

// export functions
export { initialiseNote, captureUserEntry, viewAllNotes, toggleHidden, toggleMissedDays, closeModal };