const Application = {
    save() {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },

            notes: {
                idCounter: Note.idCounter,
                items: []
            }            
        }

        document.querySelectorAll('.column').forEach(columnElement => {
            const column = {
                title: columnElement.querySelector('.column-header').textContent,
                id: parseInt(columnElement.getAttribute('data-column-id')),
                noteIds: []
            }

            columnElement.querySelectorAll('.note').forEach(noteElement => {
                column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
            })

            object.columns.items.push(column);
        });

        document.querySelectorAll('.note').forEach(noteElement => {
            const note = {
                id: parseInt(noteElement.getAttribute('data-note-id')),
                content: noteElement.textContent
            }

            object.notes.items.push(note);
        });

        const json = JSON.stringify(object);

        localStorage.setItem('task-tracker', json)
    },

    load() {
        if (!localStorage.getItem('task-tracker')) {
            return;
        }

        const mountPoint = document.querySelector('.columns');
        mountPoint.innerHTML = '';

        const object = JSON.parse(localStorage.getItem('task-tracker'));
        const getNoteById = id => object.notes.items.find(note => note.id === id)

        for (const column of object.columns.items) {
            const columnElement = Column.create(column.id, column.title)
            mountPoint.append(columnElement);

            for (const noteId of column.noteIds) {
                const note = getNoteById(noteId);

                const noteElement = Note.create(note.id, note.content);
                columnElement.querySelector('[data-notes]').append(noteElement);
            }
        }
    }
}