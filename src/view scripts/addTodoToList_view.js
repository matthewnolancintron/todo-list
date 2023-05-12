export { addTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';


async function addTodoToList(todoAndListData) {
  let todo = todoAndListData[0];
  let list = todoAndListData[1];

  /**
    save todo to list if none specified default is active list
    but if specified in the place in list option then move to that
    list.
  */

  //save todo to list in savedLists array in local storage
  saveTodoToSavedListsArray(todo, list.value);

  //if list.value is equal to the active list  
  let savedLists = await updateUserFireStoreData('list', 'retriveListData');
  let idOfList = savedLists[list.value]['todoListData'].uuid
  let listElement = document.getElementById(idOfList);

  if (listElement.classList.contains("todo-list_activeList")) {
    //add todo to the todo area
    document.getElementsByClassName("todo-items")[0].append(todo);
  }
}