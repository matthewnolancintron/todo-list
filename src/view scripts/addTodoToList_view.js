export { addTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';
/**
 * add a todo to the todo area
 * and saves it to the active list by default
 */
function addTodoToList(todoAndListData) {
  let todo = todoAndListData[0];
  let list = todoAndListData[1];
  console.log(list.value, 'list index')
  /**
  save todo to list if none specified default is active list
  but if specified in the place in list option then move to that
  list.
   */
  saveTodoToSavedListsArray(todo, list.value);

  let savedLists = JSON.parse(localStorage.getItem('savedLists'));
  console.log(savedLists,'savedLists');

  if (savedLists[list.value][0].classList.contains("todo-list_activeList")) {
    document.getElementsByClassName("todo-items")[0].prepend(todo);
  }
  localStorage.setItem('savedLists',JSON.stringify(savedLists));
}