/**
 * sets event listener to addNewList button
 */
export { addEventToAddNewListButton };
import { addActiveListEventToList } from './addActiveListEventToList_view.js'
import { renameList } from './renameList_view.js';
import { handleTextInputStateChanges } from './handleTextInputStateChanges_view.js';
import { updateListInViewIndex } from './updateListInViewIndex_view.js'


//uuid
const {v4 : uuidv4} = require('uuid');

function addEventToAddNewListButton() {
  let addNewListButton = document.querySelector("#addNewList");

  addNewListButton.addEventListener('click', (e) => {
    let indexOfActiveListInSavedLists = localStorage.getItem('indexOfActiveListInSavedLists');
  

    //get listInViewIndex from unorder list holder 
    let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));

    /**
      * amount to update is by the lengh of the list minus it's current index plus 1
      */
    let listOfListsLength = document.querySelector('#todo-lists').childElementCount + 1;
    updateListInViewIndex('up', (listOfListsLength - (listInViewIndex + 1)));

    //
    let todoListItem = document.createElement("li");
    todoListItem.classList.add("todo-list");

    //add uuid to the id of the todoListItem
    todoListItem.id = uuidv4();

    //pass todo list item to function to add 
    //the event listner for handling active list
    addActiveListEventToList(todoListItem);

    let todoItemSizingContainer = document.createElement('div');
    todoItemSizingContainer.classList.add('todoItemSizingContainer');
    todoListItem.append(todoItemSizingContainer);

    todoListItem = renameList(todoListItem);

    //adding todo list to dom
    document.querySelector("#todo-lists").append(todoListItem);

    let textInputForThisParticularTodoListItem = todoListItem.children[0].children[0];

    /**
     * passing the text input for the newly added todo list
     * to the handleTextInputStateChanges function.
     */
    handleTextInputStateChanges(textInputForThisParticularTodoListItem,todoListItem);
  });
  

}