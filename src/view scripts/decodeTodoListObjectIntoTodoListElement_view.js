export { decodeListIntoTodoListElement };
import { renameList } from './renameList_view.js';
import { setTodoListTitle } from './setTodoListTitle_view.js';

function decodeListIntoTodoListElement(todoListObjectData) {
    let todoListItem = document.createElement("li");
    todoListItem.classList.add("todo-list");

    //add uuid to the id of the todoListItem
    todoListItem.id = todoListObjectData.uuid;  

    //not sure about this functionality for now.
    //pass todo list item to function to add 
    //the event listner for handling active list
    /**only add to the list inview probaly starting list index 0 */
    // addActiveListEventToList(todoListItem);

    let todoItemSizingContainer = document.createElement('div');
    todoItemSizingContainer.classList.add('todoItemSizingContainer');
    todoListItem.append(todoItemSizingContainer);

    todoListItem = renameList(todoListItem);
    setTodoListTitle(todoListItem,todoListObjectData.listName);

    /**fix rename functionality for the list */
    /**fix a lot of other things... */

    return todoListItem;
}