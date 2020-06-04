// Add task action
document.querySelectorAll('.column').forEach(Column.process)

// Add card action
document.querySelector('[data-action-addColumn]').addEventListener('click', (e) => {
    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.setAttribute('draggable', 'true');
    columnElement.setAttribute('data-column-id', Column.idCounter);
    
    Column.idCounter++;
    columnElement.innerHTML = `
        <p class="column-header">Предмет</p>
        <div data-notes>
        </div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить задание</span>
        </p>
    `;

    document.querySelector('.columns').append(columnElement);
    Column.process(columnElement);
})

document.querySelectorAll('.note').forEach(Note.process)
