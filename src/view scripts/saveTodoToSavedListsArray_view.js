export { saveTodoToSavedListsArray };
import { encodeTodoElementIntoTodoObjectData } from './encodeTodoElementIntoTodoObjectData_view.js';
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';

/**
 * takes a todo and saves it to the index of list in
 * the savedLists array specified.
 * if list paramater is not specified the list defaults
 * to the index of the active list
 */
async function saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = localStorage.getItem('indexOfActiveListInSavedLists')) {
    let dataForUpdatingFireStore = {
        listIndex: indexOfListToSaveTo ,
        todoItemData: encodeTodoElementIntoTodoObjectData(todoToSave),
    };
    return updateUserFireStoreData('todo-item', 'add todo', dataForUpdatingFireStore);
}