const Column = {
    idCounter: 4,
    dragged: null,
    dropped: null,
    
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
            Application.save();
        })

        columnElement.addEventListener('dragstart', Column.dragstart);
        columnElement.addEventListener('dragend', Column.dragend);

        // columnElement.addEventListener('dragenter', Column.dragenter);
        columnElement.addEventListener('dragover', Column.dragover);
        // columnElement.addEventListener('dragleave', Column.dragleave);

        columnElement.addEventListener('drop', Column.drop);
    },

    create(id = null, title = '') {
        const columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggable', 'true');

        if (id) {
            columnElement.setAttribute('data-column-id', id);
        } else {
            columnElement.setAttribute('data-column-id', Column.idCounter);
            Column.idCounter++;
        }
        
        columnElement.innerHTML = `
            <p class="column-header">Предмет</p>
            <div data-notes>
            </div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить задание</span>
            </p>
        `;

        if (title) {
            columnElement.querySelector('.column-header').textContent = title;
        }

        Column.process(columnElement);

        return columnElement;
    },

    dragstart(e) {
        Column.dragged = this;
        Column.dragged.classList.add('dragged');

        e.stopPropagation();

        document.querySelectorAll('.note').forEach(noteElement => noteElement.removeAttribute('draggable'));
    },

    dragend(e) {
        Column.dragged.classList.remove('dragged');
        Column.dragged = null;
        Column.dropped = null;

        document.querySelectorAll('.note').forEach(noteElement => noteElement.setAttribute('draggable', 'true'));

        Application.save();
    },

    // dragenter(e) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return;
    //     }

    //     this.classList.add('under');
    // },

    dragover(e) {        
        e.preventDefault();
        e.stopPropagation();

        if (Column.dragged === this) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under');
            }
            Column.dropped = null;
        }

        if (!Column.dragged || Column.dragged === this) {
            return;
        }

        Column.dropped = this;

        document.querySelectorAll('.column').forEach(column => column.classList.remove('under'))

        this.classList.add('under');
    },

    // dragleave(e) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return;
    //     }

    //     this.classList.remove('under');
    // },

    drop(e) {
        if (Column.dragged) {
            const columns = Array.from(document.querySelector('.columns').children);
            const indexDragged = columns.indexOf(Column.dragged);
            const indexUnder = columns.indexOf(this);

            if (indexUnder > indexDragged) {
                document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling);
            } else {
                document.querySelector('.columns').insertBefore(Column.dragged, this);
            }

            document.querySelectorAll('.column').forEach(column => column.classList.remove('under'))
        }
    }
}