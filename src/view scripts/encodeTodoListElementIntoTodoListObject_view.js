export { encodeTodoListElementIntoTodoListObject };

function encodeTodoListElementIntoTodoListObject(todoListElement) {
   let listName = todoListElement.children[0].children[0].textContent;
   let uuid = todoListElement.id;
    let todoListObjectData = {
        listName: listName,
        uuid: uuid,
    };

    return todoListObjectData;
}
