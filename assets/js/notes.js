// NOTES DATA helpers
// save new note to localStorage, update array
function saveNewNote(newNote, notes) {
    notes.unshift(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
}


// save placeholder note to fill journal gaps
function savePlaceholderNote(placeholderNote, index, notes) {
    notes.splice(index + 1, 0, placeholderNote);
    localStorage.setItem("notes", JSON.stringify(notes));
}


// saves over existing note data (only TITLE and CONTENT)
function overrideNoteData(userEntry, data) {

    // double check id matches
    if (userEntry.id !== data.id) {
        return;
    }

    // get index of note to override
    const index = notes.findIndex( (note) => userEntry.id === note.id);

    // override data
    notes[index].title = userEntry.title;
    notes[index].content = userEntry.content;
    localStorage.setItem("notes", JSON.stringify(notes));
}


// deletes a note from localStorage and notes array
function deleteNoteData(noteId) {
    const noteIndex = notes.findIndex( (note) => note.id === noteId);
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
}


// formats new note data
function createNoteData (noteId, title, date, moon, content) {
    return {
        id: noteId,
        title: title,
        date: date,
        moon: moon,
        content: content
    };
}


// formats placeholder data for missed journaling days (Red Moons)
function createPlaceholderNoteData({ placeholderId, placeholderDate }) {
    return {
        id: placeholderId,
        title: "Inkless interval",
        date: placeholderDate,
        moon: "RED MOON",
        content: "A silent page..."
    };
}


// check if the note ID of new user entries matches any existing notes
function isNewNote(userEntry) {
    const existingNote = notes.find( (note) => note.id === userEntry.id);

    return existingNote
    ? { exists: true, id: userEntry.id }
    : { exists: false };
}


// check to see if there are any missed journaling days, and populate with placeholder data (Red Moons)
function fillMissingDaysData(notes) {
    for (let index = 0; index < notes.length - 1; index++) {
        const { isYesterday, placeholderId, placeholderDate } = isPrevNoteYesterday(index, notes);

        // insert placeholder data to backfill missing days
        if (!isYesterday) {
            const placeholderNote = createPlaceholderNoteData({ placeholderId, placeholderDate });
            savePlaceholderNote(placeholderNote, index, notes);
        }
    }
}
// helper for backfilling days, checks if previous note in array is considered Yestreday
function isPrevNoteYesterday(index, notes) {

    // get current and prev note dates, based on ID
    let noteDate = new Date(Number(notes[index].id));
    let prevNoteDate = new Date(Number(notes[index + 1].id));
    
    // get expected date
    let trueYesterday = new Date(noteDate);
    trueYesterday.setDate(trueYesterday.getDate() - 1);

    // check if the previous note in array is exactly yesterday
    return (prevNoteDate.toDateString() === trueYesterday.toDateString())
        ? { isYesterday: true }
        : { 
            isYesterday: false,
            placeholderDate: trueYesterday.toDateString(),
            placeholderId: trueYesterday.getTime().toString()
        };
}


// NOTES UI helpers
// display today's note
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


// displays a check to user before initiating save override
function displayOverrideCheck(userEntry, note, elements) {
    elements.notesContainer.innerHTML = "";
    elements.modalTitle.innerText = "Do you wish to override this save?";
    
    // create save button
    const saveBtn = createModalBtn("Save note", () => {
        overrideNoteData(userEntry, note);
        closeModal(elements);
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(saveBtn);

    //create cancel button
    const cancelBtn = createModalBtn("Cancel", () => {
        closeModal(elements);
        elements.modalTitle.innerText = "Select note";
    })
    elements.notesContainer.appendChild(cancelBtn);

    // display model and allow user to make a decision
    openModal(elements);
}


// injects saved note data into UI
function openSavedNote(noteId, elements) {
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


// create DOM element for a saved note
function createNoteElement(note, elements) {

    // creates DOM elements for visual information, and injects with data
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

    // create buttons with event listeners
    const openNoteBtn = createModalBtn("Open note", () => {
        openSavedNote(note.id, elements);
    })
    const deleteNoteBtn = createModalBtn("Delete note", () => {
        deleteNoteElement(note.id, elements);
        deleteNoteData(note.id);
    })

    // attaches elements to DOM
    elements.notesContainer.appendChild(savedNote);
    savedNote.appendChild(openNoteBtn)
    savedNote.appendChild(deleteNoteBtn);
}


// create message to inform user that no notes are currently saved
function createEmptyNotesMessage(elements) {
    const emptyMessage = document.createElement("div");
    emptyMessage.innerHTML = `
        <div class="note">
            <h3 class="note-title"
            >You currently have no saved notes!</h3>
        </div>`;

    elements.notesContainer.appendChild(emptyMessage);
}


// open and close modal, where notes are saved
function openModal(elements) {
    elements.notesContainerModal.classList.add("active");
}
function closeModal(elements) {
    elements.notesContainerModal.classList.remove("active");
}


// create modal buttons
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
// captures user entry when "Save note" is clicked
function captureUserEntry(e, elements, notes) {
    e.preventDefault();

    // check if user has created a new unique note
    let noteId = elements.noteForm.dataset.noteId;
    if (!noteId) {
        noteId = Date.now().toString();
        elements.noteForm.setAttribute("data-note-id", noteId);
    }

    const title = elements.noteTitle.value;
    const date = elements.noteDate.textContent;
    const moon = elements.noteMoon.textContent;
    const content = elements.noteContent.value;

    // store user submitted data
   const userEntry = createNoteData(noteId, title, date, moon, content);

   // process note inputted by user
   handleSaveNote(userEntry, elements, notes);
}


// takes user inputted data and handles how to process
function handleSaveNote(userEntry, elements, notes) {

    // save new unique note to localStorage and update notes array
    const note = isNewNote(userEntry);
    if (!note.exists) {
        return saveNewNote(userEntry, notes);
    }

    // if note is already stored, check user wishes to update the data
    displayOverrideCheck(userEntry, note, elements);
}


// display all saved notes to user
function viewAllNotes(elements, notes) {

    // clear modal container
    elements.notesContainer.innerHTML = "";

    // show no notes if none saved
    if (notes.length === 0) {
        createEmptyNotesMessage(elements);
        return openModal(elements);
    }

    // display note if only one is saved
    if (notes.length === 1) {
        createNoteElement(notes[0], elements);
        return openModal(elements);
    }

    // if multiple saved notes, fill any gaps before displaying
    fillMissingDaysData(notes);

    // create a DOM element for each saved note
    notes.forEach( (note) => {
        createNoteElement(note, elements);
    });
    openModal(elements);
}

// export functions
export { initialiseNote, captureUserEntry, viewAllNotes, toggleHidden, closeModal };