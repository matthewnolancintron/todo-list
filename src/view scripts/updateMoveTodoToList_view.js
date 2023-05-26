export { updateMoveTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';
import { deleteTodoFromList } from './deleteTodoFromList_view.js';


async function updateMoveTodoToList(e) {
    try {
        let isSaved = await saveTodoToSavedListsArray(e.target.parentElement, e.target.value);

        //remove todo from dom and saveLists
        if(isSaved){
            deleteTodoFromList(e.target.parentElement);
        }
    } catch (error) {
        console.error(error);
    }
}