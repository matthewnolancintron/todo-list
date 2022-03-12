export { addEventToTodoListsAddActive };
import{addActiveListEventToList} from './addActiveListEventToList_view.js'

//used to add active to default list
function addEventToTodoListsAddActive() {
  let todoList = document.querySelectorAll(".todo-list");
  todoList.forEach((element) => {
    addActiveListEventToList(element);
  });
}