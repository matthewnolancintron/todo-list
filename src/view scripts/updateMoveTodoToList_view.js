export { updateMoveTodoToList };
import {saveTodoToSavedListsArray} from './saveTodoToSavedListsArray_view.js';
import {deleteTodoFromList} from './deleteTodoFromList_view.js';

function updateMoveTodoToList(e) {
    //save todo to new list
    //saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = indexOfactiveListInSaveLists)
    saveTodoToSavedListsArray(e.target.parentElement, e.target.value)

    //remove todo from dom and saveLists
    deleteTodoFromList(e.target.parentElement);
}