/**
 * sets event listener to addNewList button
 */
export { addEventToAddNewListButton };
import { addActiveListEventToList } from './addActiveListEventToList_view.js'
import { renameList } from './renameList_view.js';
import { updateSavedLists } from './updateSavedLists_view.js';
import { handleTextInputStateChanges } from './handleTextInputStateChanges_view.js';
import { updateListInViewIndex } from './updateListInViewIndex_view.js'


function addEventToAddNewListButton() {
  console.log(document.getElementById('todo-lists'));

  let addNewListButton = document.querySelector("#addNewList");
  //console.log("addNewList", addNewListButton);
  addNewListButton.addEventListener('click', (e) => {
    let indexOfActiveListInSavedLists = localStorage.getItem('indexOfActiveListInSavedLists');
    console.log(indexOfActiveListInSavedLists,'activeListInSavedListsArray')
    //get listInViewIndex from unorder list holder 
    let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));
    console.log(listInViewIndex, 'value');

    /**
      * amount to update is by the lengh of the list minus it's current index plus 1
      */
    let listOfListsLength = document.querySelector('#todo-lists').childElementCount + 1;
    updateListInViewIndex('up', (listOfListsLength - (listInViewIndex + 1)));
    //testing values
    // console.log(listOfListsLength, 'listOfListslength');
    // console.log(listInViewIndex, 'listinviewindex');
    // console.log(listInViewIndex + 1, 'listinvewindex+1');
    // console.log(`lengthOfLists(${listOfListsLength}) - (listinViewIndex+1(${listInViewIndex + 1})) = amount(${(listOfListsLength - (listInViewIndex + 1))})`);
    // console.log((listOfListsLength - (listInViewIndex + 1)), 'amount');
    
    //
    let todoListItem = document.createElement("li");
    todoListItem.classList.add("todo-list");

    //pass todo list item to function to add 
    //the event listner for handling active list
    addActiveListEventToList(todoListItem);

    let todoItemSizingContainer = document.createElement('div');
    todoItemSizingContainer.classList.add('todoItemSizingContainer');
    todoListItem.append(todoItemSizingContainer);

    todoListItem = renameList(todoListItem);

    //save newly create todo list to savedLists array
    updateSavedLists(todoListItem, 'newList');

    //adding todo list to dom
    document.querySelector("#todo-lists").append(todoListItem);

    let textInputForThisParticularTodoListItem = todoListItem.children[0].children[0];

    /**
     * passing the text input for the newly added todo list
     * to the handleTextInputStateChanges function.
     */
    handleTextInputStateChanges(textInputForThisParticularTodoListItem);
  });
  //
}