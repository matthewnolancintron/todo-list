export { saveTodoToSavedListsArray };
import { encodeTodoElementIntoTodoObjectData } from './encodeTodoElementIntoTodoObjectData_view.js';
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';

async function saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = localStorage.getItem('indexOfActiveListInSavedLists')) {
    let dataForUpdatingFireStore = {
        listIndex: indexOfListToSaveTo ,
        todoItemData: encodeTodoElementIntoTodoObjectData(todoToSave),
    };
    return updateUserFireStoreData('todo-item', 'add todo', dataForUpdatingFireStore);
}