// Add task action
document.querySelectorAll('.column').forEach(Column.process)

// Add card action
document.querySelector('[data-action-addColumn]').addEventListener('click', (e) => {
    const columnElement = Column.create();
    document.querySelector('.columns').append(columnElement);
})

document.querySelectorAll('.note').forEach(Note.process)
