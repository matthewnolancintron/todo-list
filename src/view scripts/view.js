export { View };
import { updateTodosInTodoArea } from './updateTodoInTodoArea_view.js';
import { addActiveListEventToList } from './addActiveListEventToList_view.js';
import { addEventToAddNewListButton } from './addEventToAddNewListButton_view.js';
import { addEventToRenameListButton } from './addEventToRenameListButton_view.js';
import { addEventToDeleteListButton } from './addEventToDeleteListButton_view.js';
import { addEventToTodoListsAddActive } from './addEventToTodoListsAddActive_view.js';
import { addEventToLeftTodoListButton } from './addEventToLeftTodoListButton_view.js';
import { addEventToRightTodoListButton } from './addEventToRightTodoListButton_view.js';
import { addEventToRepeatOptions } from './addEventToRepeatOptions_view.js';
import { addEventToAddTodoButton } from './addEventToAddTodoButton_view.js';
import { addEventToCancelTodoButton } from './addEventToCancelTodoButton_view.js';
import { addEventToConfirmTodoButton } from './addEventToConfirmTodoButton_view.js';

//uuid
const { v4: uuidv4 } = require('uuid');

/**
 * 0:create controller
 *  -orchestrate view scrips in index.js
 *    possible delete view.js or find a different use for it
 *    while calling modules from view scripts within index.js
 *    also call modules from data scripts and handle passing 
 *    information back and forth between model and view when needed  
 * 
 * 1:build data modules
 * -separate data(local storage) from view 
 * 
 * 2: last feature for now.
 * -data persiests:
 *    move any local stoarge releated tasks and to data scrips rename the scripts
 *    and updata the imports
 *     configure application to pick up where the user left off by checking
 *     local storage and then updating application state accordingly
 * 
 * 
 *  after completing the above this project is completed for now move
 *  on to the next steps in the TOP
 */

function View() {
  document.addEventListener('DOMContentLoaded', () => {
    //Global variables:
    /**
     * store "global" variables in local storage
     * 
     * Make sure app doesn’t crash 
     * if the data retrieved from localStorage
     * isn’t there! 
     * 
     * method available for web storage api:
     * setItem, getItem, removeItem, key, length
     */

    /**
     * store listinViewIndex in global storage
     */
    localStorage.setItem('listInViewIndex', 0);

    //add unnique id to the default list
    let defaultList = document.getElementsByClassName("todo-list")[0];
    defaultList.id = uuidv4();

    //active list by default (will soon be the last list the user had as active)
    //testing
    let stringy = JSON.stringify(defaultList.id);
    console.log(document.getElementById(defaultList.id), 'intended value for default list');
    console.log(stringy, 'stringify default list');
    console.log(JSON.parse(stringy), 'default list parse passed to document get element by id');
    console.log(document.getElementById(JSON.parse(stringy)), 'json parse passed to getElementsById');
    /**
     * both todo lists and todo's id's get are a uuid
     * generated with uudiv4();
     * need to import into each script that uses it.
     * 
     * run to gain functionality 
     * npm install uuid
     */

    //array of list elements and the todo that belong to them.
    localStorage.setItem('savedLists', JSON.stringify([[defaultList.id, []],]));


    /**
     * index of the active lists starts as the first list
     * will update via add active list func
     */
    localStorage.setItem('indexOfActiveListInSavedLists', 0);

    /**start todo List funtionality */
    /**
     * add new list:
     * sets link to button in dom and
     * adds event to the button
     */
    addEventToAddNewListButton();
    //update listInView parameter for the above function

    /**
     * rename:
     * set link to button in dom and add event to button
     */
    addEventToRenameListButton();
    //update listInView parameter for the above function

    //delete a list
    addEventToDeleteListButton();
    //update listInView parameter for the above function


    //getTodoListTitle();

    //setTodoListTitle();

    //addActiveListEventToList();

    //renameList();

    //handleTextInputStateChanges();

    /**
     * set active list functinality on page start
     */
    addEventToTodoListsAddActive();
    //update listInView parameter for the above function

    // <!-- add functionality to arrow buttons on the todo lists area -->
    addEventToLeftTodoListButton();
    //update listInView parameter for the above function

    //
    addEventToRightTodoListButton();
    //update listInView parameter for the above function


    /**end of list functionality code */

    //updatePlaceinListFormFieldOnListRename();

    //updateMoveTodoOption();

    //updateOptionInPlaceInListFormField

    //repeatOptions on add todo form stuff.
    let repeat_options = document.getElementById('repeat_options');
    let dayOfTheWeekSelector = document.querySelector('.dayOfTheWeekSelector');

    //
    addEventToRepeatOptions(repeat_options, dayOfTheWeekSelector);


    /*add todo form when user presses add todo button*/
    let addTodoButton = document.querySelector('.add_Todo');
    let addTodoForm = document.querySelector('.addTodoForm_inactive');


    let numRepeatElement = document.getElementById('times');
    numRepeatElement.value = "";
    //console.log(repeat_options);
    //
    addEventToAddTodoButton(addTodoButton, addTodoForm, numRepeatElement);

    switch (document.getElementsByClassName("toggle_repeat_OFF")[0].textContent) {
      case "OFF":
        numRepeatElement.disabled = true;
        repeat_options.disabled = true;
        break;
      default:
        break;
    }

    /** start of todos functionality */
    /**confirm and cancel todo events */
    let confirmOrCancelTodoButtons = document.querySelectorAll(".confirmOrCancel_Todo");

    //
    addEventToCancelTodoButton(confirmOrCancelTodoButtons, addTodoForm, dayOfTheWeekSelector, addTodoButton);

    //
    addEventToConfirmTodoButton(confirmOrCancelTodoButtons, addTodoForm, dayOfTheWeekSelector);
  });
}