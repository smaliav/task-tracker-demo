const Column = {
    idCounter: 4,
    
    process(columnElement) {
        const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');
    
        spanActionAddNote.addEventListener('click', (e) => {
            noteElement = Note.create();
            columnElement.querySelector('[data-notes]').append(noteElement);
            noteElement.setAttribute('contenteditable', 'true');
            noteElement.focus();
        })
    
        const headerElement = columnElement.querySelector('.column-header');
        headerElement.addEventListener('dblclick', (e) => {
            headerElement.setAttribute('contenteditable', 'true');
            headerElement.focus()
        })
    
        headerElement.addEventListener('blur', (e) => {
            headerElement.removeAttribute('contenteditable');
        })

        columnElement.addEventListener('dragover', Column.dragover);
    },

    dragover(e) {
        e.preventDefault();
    }
}