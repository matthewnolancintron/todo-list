export { updateTodoInSavedListsArray };
import { encodeTodoElementIntoTodoObjectData } from './encodeTodoElementIntoTodoObjectData_view.js';

/**
 * takes a todo and saves it to the index of list in
 * the savedLists array specified.
 * if list paramater is not specified the list defaults
 * to the index of the active list
 */
function updateTodoInSavedListsArray(todoToSave, indexOfListToSaveTo = localStorage.getItem('indexOfActiveListInSavedLists')) {
    //encode todo element into object and store that to local storage
    let todoObjectData = encodeTodoElementIntoTodoObjectData(todoToSave);

    //get savedLists array from local storage
    let savedLists = JSON.parse(localStorage.getItem('savedLists'));

    /**
     * find and replace todoToSave in savedLists array
     */
    //find
    let indexOfTodoInSavedListsArray;
    console.log(todoObjectData.uuid, 'todoObjectData.uuid')
    savedLists[indexOfListToSaveTo][1].forEach((todo, index) => {
        console.log(todo.uuid, 'todo.uuid');
        if (todo.uuid == todoObjectData.uuid) {
            indexOfTodoInSavedListsArray = index;
        }
    });
    //replace
    savedLists[indexOfListToSaveTo][1].splice(indexOfTodoInSavedListsArray, 1, todoObjectData);

    //update local storage with the changes
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
}  