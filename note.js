const Note = {
    idCounter: 8,
    dragged: null,

    process(noteElement) {
        noteElement.addEventListener('dblclick', (e) => {
            noteElement.removeAttribute('draggable');
            noteElement.closest('.column').removeAttribute('draggable');
            noteElement.setAttribute('contenteditable', 'true');
            noteElement.focus()
        })
        
        noteElement.addEventListener('blur', (e) => {
            noteElement.setAttribute('draggable', 'true');
            noteElement.closest('.column').setAttribute('draggable', 'true');
            noteElement.removeAttribute('contenteditable');
    
            if (!noteElement.textContent.trim().length) {
                noteElement.remove();
            }
        })
    
        noteElement.addEventListener('dragstart', Note.dragstart);
        noteElement.addEventListener('dragend', Note.dragend);
        noteElement.addEventListener('dragenter', Note.dragenter);
        noteElement.addEventListener('dragover', Note.dragover);
        noteElement.addEventListener('dragleave', Note.dragleave);
        noteElement.addEventListener('drop', Note.drop);
    },

    create() {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', Note.idCounter);

        Note.idCounter++;
        Note.process(noteElement);
        
        return noteElement;
    },

    dragstart(e) {
        Node.dragged = this;
        this.classList.add('dragged');
        
        e.stopPropagation();
    },
    
    dragend(e) {
        Node.dragged = null;
        this.classList.remove('dragged');
    
        document.querySelectorAll('.note').forEach(x => x.classList.remove('under'));
        e.stopPropagation();
    },
    
    dragenter(e) {
        e.stopPropagation();

        if (!Note.dragged || this === Node.dragged) {
            return;
        }
    
        this.classList.add('under');
    },
    
    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    
        if (!Note.dragged || this === Node.dragged) {
            return;
        }        
    },
    
    dragleave(e) {
        e.stopPropagation();

        if (!Note.dragged || this === Node.dragged) {
            return;
        }
        
        this.classList.remove('under');
    },
    
    drop(e) {
        e.stopPropagation();
    
        if (this === Node.dragged) {
            return;
        }
        
        if (this.parentElement === Node.dragged.parentElement) {
            const notes = Array.from(this.parentElement.querySelectorAll('.note'));
            const indexDragged = notes.indexOf(Node.dragged);
            const indexUnder = notes.indexOf(this);
    
            if (indexUnder > indexDragged) {
                this.parentElement.insertBefore(Node.dragged, this.nextElementSibling);
            } else {
                this.parentElement.insertBefore(Node.dragged, this);
            }
        }
    }
}
