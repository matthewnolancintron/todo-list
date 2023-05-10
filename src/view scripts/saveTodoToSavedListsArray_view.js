export { saveTodoToSavedListsArray };
import {encodeTodoElementIntoTodoObjectData} from './encodeTodoElementIntoTodoObjectData_view.js';
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';

/**
 * takes a todo and saves it to the index of list in
 * the savedLists array specified.
 * if list paramater is not specified the list defaults
 * to the index of the active list
 */
function saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = localStorage.get('indexOfActiveListInSavedLists')) {
    console.log(todoToSave, 'todoToSave');
    console.log(indexOfListToSaveTo, 'indexOfListToSaveto');
    //console.log([indexOfListToSaveTo][1],'list to save 000');

    //encode todo element into object and store that to local storage
    let todoObjectData = encodeTodoElementIntoTodoObjectData(todoToSave);
    console.log(todoObjectData,'todoObjectData');
    console.log(JSON.stringify(todoObjectData),'json todo object data');
    let savedLists = JSON.parse(localStorage.getItem('savedLists'));
    savedLists[indexOfListToSaveTo][1].push(todoObjectData);
    console.log(JSON.stringify(savedLists),'json string savedlist with todo object data')
    localStorage.setItem('savedLists', JSON.stringify(savedLists));

    let dataForUpdatingFireStore = {
        listIndex: indexOfListToSaveTo,
        todoItemData: todoObjectData,
    };

    updateUserFireStoreData('todo-item','add todo',dataForUpdatingFireStore);
}  