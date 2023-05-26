export {deleteTodoFromList};
import {deleteTodoFromSavedListsArray} from './deleteTodoFromSavedListsArray_view.js';

/**
 * deletes todo from savedLists array
 * and removes it from the DOM
*/
function deleteTodoFromList(todo) {
    //delete todo from savedLists array
    deleteTodoFromSavedListsArray(todo);
    //remove from DOM
    todo.remove();
}