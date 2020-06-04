const Column = {
    idCounter: 4,
    
    process(columnElement) {
        const spanActionAddNote = columnElement.querySelector('[data-action-addNote]');
    
        spanActionAddNote.addEventListener('click', (e) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.setAttribute('draggable', 'true');
            noteElement.setAttribute('data-note-id', Note.idCounter);
    
            Note.idCounter++;
            columnElement.querySelector('[data-notes]').append(noteElement);
            Note.process(noteElement);
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
    }
}