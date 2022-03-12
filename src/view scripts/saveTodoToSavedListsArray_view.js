import { updateIndexOfActiveListInSavedLists } from "./updateIndexOfActiveListInSavedLists_view";

export{saveTodoToSavedListsArray};
/**
 * takes a todo and saves it to the index of list in
 * the savedLists array specified.
 * if list paramater is not specified the list defaults
 * to the index of the active list
 */
function saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = localStorage.get('indexOfActiveListInSavedLists')) {
    let savedLists = JSON.parse(localStorage.getItem('savedLists'));
    savedLists[indexOfListToSaveTo][1].push(todoToSave);
    localStorage.setItem('savedLists',JSON.stringify(savedLists));
}  