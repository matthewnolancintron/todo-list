export { addTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';

/**
 * add a todo to the todo area
 * and saves it to the active list by default
 */
function addTodoToList(todoAndListData) {
  console.log(todoAndListData, 'todo and list data');

  let todo = todoAndListData[0];
  let list = todoAndListData[1];

  /**
  save todo to list if none specified default is active list
  but if specified in the place in list option then move to that
  list.
   */
  console.log(todo, 'todo');
  console.log(list, 'list')

  //save todo to list in savedLists array in local storage
  saveTodoToSavedListsArray(todo, list.value);

  //if list.value is equal to the active list  
  //figure out contional expression
  console.log(list.classList.contains("todo-list_activeList"),'list active?');
  console.log(list.classList,'classList?');

  /**
   * 
   */
   let savedLists = JSON.parse(localStorage.getItem('savedLists'));
   let idOfList = savedLists[list.value][0]
   console.log(idOfList,'id of list');
   let listElement = document.getElementById(idOfList);
   console.log(listElement,"listElement");

  if(listElement.classList.contains("todo-list_activeList")){
    //add todo to the todo area
    document.getElementsByClassName("todo-items")[0].append(todo);
  }
  //if not then updateTodoInTodoArea will handle it when user select another list to be active

  // let savedLists = JSON.parse(localStorage.getItem('savedLists'));

  // if (savedLists[list.value][0].classList.contains("todo-list_activeList")) {
  //   document.getElementsByClassName("todo-items")[0].prepend(todo);
  // }
}