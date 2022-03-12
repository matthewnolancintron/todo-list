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

function View() {
  document.addEventListener('DOMContentLoaded', () => {
    //Global variables:
    /**
     * store "global" variables in local storage
     * part of the web storage api
     * 
     * savedListsArray will be moving to local storage 
     * soon
     * 
     * Make sure app doesn’t crash 
     * if the data retrieved from localStorage
     * isn’t there!
     * 
     * local storage uses json.
     * 
     * can't store function in local storage
     * need to find way to add back methods 
     * 
     * method available for web storage api:
     * setItem, getItem, removeItem, key, length
     */

    
    /**
     * store listinViewIndex in global storage
     */
     localStorage.setItem('listInViewIndex', 0);

     /**
      * @ solving this issue.
      * trying to correctly store savedLists array in to local storage
      * but the live htmlcollection stored in to it are being saved as empty objects
      * 
      * need to find a way to store live html collection so that when retrived it's not empty
      * 
      * option 1: wrap in quotes:
      * stores a string version of "document.getElementByClassName("todo-list")[0]"
      * which is the value of the varible/live html collection in string form
      * stores in local storage just fine,
      * issue not sure how to convert that string into raw value after it's parsed
      * maybe try eval(JSON.parse(defaultList))
      * issue eval is a security flaw
      * 
      * 
      * option 2: outer.html
      * stores all of the html from the live htmlCollection as string in local storage
      * stores fine, retrivel is the difficult part
      * 
      * find solution to bring outerHTML into live htmlcollection
      * or 
      * outerHTML to document.getElementByClassName... and so on.
      * 
      * after this update all places where savedLists is used to make sure it's being correctly updated in local storage
      * then test the application
      * 
      * go back to checing for all global variables and storing/retrieving in local storege
      * 
      * finish by separete local storage from view and move into data model script
      * 
      * orchestrate all of what's in view with index 
      * index = controller view = view data-model = model
      */

    //active list by default (will soon be the last list the user had as active)
    let defaultList = JSON.stringify(Array.from(document.getElementsByClassName("todo-list")[0]));
    console.log(document.getElementsByClassName("todo-list")[0],'intended value for default list')
    console.log(Array.from(document.getElementsByClassName("todo-list")[0]),'using array from on default list')
    console.log(defaultList,'stringify default list');
    console.log(JSON.parse(defaultList),'default list');


    //array of list elements and the todo that belong to them.
    localStorage.setItem('savedLists',JSON.stringify([[defaultList, []],]));
    // let savedLists = [
    //   [defaultList, []],
    // ];
    //turn string default list value into non string value

    /**
     * index of the active lists starts as the first list
     * will update via add active list func
     */
    localStorage.setItem('indexOfActiveListInSavedLists',0);

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