export { updateMoveTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';
import { deleteTodoFromList } from './deleteTodoFromList_view.js';

async function updateMoveTodoToList(e) {
    //save todo to new list
    //saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = indexOfactiveListInSaveLists)
    console.log('move ?')
    try {
       await saveTodoToSavedListsArray(e.target.parentElement, e.target.value);
        //remove todo from dom and saveLists
        deleteTodoFromList(e.target.parentElement);
    } catch (error) {
        console.error(error);
    }
}