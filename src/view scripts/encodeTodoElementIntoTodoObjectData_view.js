export { encodeTodoElementIntoTodoObjectData };

function encodeTodoElementIntoTodoObjectData(todoElement) {
    let title = todoElement.children[1].textContent;
    let dueDate = todoElement.children[2].textContent;
    let repeat = todoElement.children[3].textContent;
    let uuid = todoElement.dataset.uuid;
    let todoObjectData = {
        title: title,
        dueDate: dueDate,
        repeat: repeat,
        uuid: uuid
    };

    return todoObjectData;
}