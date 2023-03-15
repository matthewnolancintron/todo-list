/** 
 extra features:
 recurring due dates for building habits
 every monday at 8am...
 steps/sub-tasks and sections for individule todos
 create labels for todos
 filter todos
 light and dark and green theme

 kaban-style cards (kaban view)
 create multiple sections with headers
 drag todo's between sections to create
 a board. 
 
 display tasks on a calendar:
 multiple calendar views
 
 daily view shows all tasks on an hour/minute
 vertical or horizontal grid:

 weekly view shows all tasks for each 
 day of the week 

 monthly view see task on all days of the month:
 */

/**
 * separate application logic 
 * creating new todo setting todos as complete
 * changing todo priority etc from dom-related stuff
 * keep all of that in separate modules
 * 
 * my plan:
 * use MVC architecture.
 * 
 * model modules for application state
 * view modules for GUI/DOM manipulation
 * 
 * controller will be index.js and the user
 * 
 */

//to run the application
//npx webpack or npx webpack --watch
//and turn on live server
//todo move these notes to a beter location.

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

import './styles.css'

//view: modules
import { updateTodosInTodoArea } from './view scripts/updateTodoInTodoArea_view.js';
import { addActiveListEventToList } from './view scripts/addActiveListEventToList_view.js';
import { addEventToAddNewListButton } from './view scripts/addEventToAddNewListButton_view.js';
import { addEventToRenameListButton } from './view scripts/addEventToRenameListButton_view.js';
import { addEventToDeleteListButton } from './view scripts/addEventToDeleteListButton_view.js';
import { addEventToTodoListsAddActive } from './view scripts/addEventToTodoListsAddActive_view.js';
import { addEventToLeftTodoListButton } from './view scripts/addEventToLeftTodoListButton_view.js';
import { addEventToRightTodoListButton } from './view scripts/addEventToRightTodoListButton_view.js';
import { addEventToRepeatOptions } from './view scripts/addEventToRepeatOptions_view.js';
import { addEventToAddTodoButton } from './view scripts/addEventToAddTodoButton_view.js';
import { addEventToCancelTodoButton } from './view scripts/addEventToCancelTodoButton_view.js';
import { addEventToConfirmTodoButton } from './view scripts/addEventToConfirmTodoButton_view.js';
import {updateListsInTodoListsArea} from './view scripts/updateListsInTodoListsArea_view.js';
import { encodeTodoListElementIntoTodoListObject } from './view scripts/encodeTodoListElementIntoTodoListObject_view';

//data:modules (not sure about these modules they are kind of redundant)
import { setItemAndValueInLocalStorage } from './data model scripts/setItemAndValueInLocalStorage_data.js';
import { getItemFromLocalStorage } from './data model scripts/getItemFromLocalStorage_data.js'


/**
     * both todo lists and todo's id's get are a uuid
     * generated with uudiv4();
     * need to import into each script that uses it.
     * 
     * run to gain functionality 
     * npm install uuid
     */
//uuid
const { v4: uuidv4 } = require('uuid');

//when dom has loaded do stuff.
document.addEventListener('DOMContentLoaded', () => {
    /**set events */
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

    /**
     * check local storage:
     * check if the following items are in local storage
     * indexOfActiveListInSavedLists, listInViewIndex,
     * savedLists
     * 
     * if they already exist don't set them
     * if not then intialize them 
     */
    if (
        localStorage.getItem('indexOfActiveListInSavedLists') == null ||
        localStorage.getItem('listInViewIndex') == null ||
        localStorage.getItem('savedLists') == null
    ) {
        console.log('empty localstorage need to intialize values');

        /**
        * store listInViewIndex in global storage
        */
        setItemAndValueInLocalStorage('listInViewIndex', 0);

        /**
         * index of the active lists starts as the first list
         * will update via add active list func
         */
        setItemAndValueInLocalStorage('indexOfActiveListInSavedLists', 0);


        /**
         * intialize default appliation state:
         */

        //add unnique id to the default list
        let defaultList = document.getElementsByClassName("todo-list")[0];
        defaultList.id = uuidv4();

        /**
         * set defaultLists uuid into local storage
         * need to used when refreshing application on subsquent uses
         */
        //encode default list before saving it to savedLists
        setItemAndValueInLocalStorage('defaultListsUuid', defaultList.id);
        let defaultListObject = encodeTodoListElementIntoTodoListObject(defaultList);

        //array of list elements and the todo that belong to them.
        setItemAndValueInLocalStorage('savedLists', JSON.stringify([[defaultListObject, []],]));

    } else {
        console.log('values already in local storage use values to update application');
        /**
         * intialize application state based on localstorage values
         */
        let a = localStorage.getItem('indexOfActiveListInSavedLists');
        let b = localStorage.getItem('listInViewIndex');
        let c = localStorage.getItem('savedLists');

        console.log(a, 'indexOfActiveListInSavedLists');
        console.log(b, 'listInViewIndex');
        console.log(c, 'savedLists');

        /**
         * all lists are missing need to adjust how I store the lists into local storage
         * copy the aproch I took with saving the todo's into local storage
         * 
         * decode encode helper functions 
         * encode new lists as they are created and saved into local stoarge so that
         * rather than just saving a uuid save and object that represent the list
         * it will be a list object data
         * might need to update rename and delete list or how they interface with local storage after this update
         * 
         * for decode take the objects and turn them into elements that will go back on to the dom
         * the decode only takes places when user refreshes the application after already having used for the first time
         * so subsequent uses
         * decode will happen in a yet to be implamented module for updating todo lists that get's the starting todo lists
         * and updates it with whats in the savedLists array from local storage take all the object data and turn to dom nodes
         * then update the dom correctly
         * 
         * not sure just yet about the listinview index or activelistindex
         * I'll see after finishing the above
         * 
         * after that just look through viewscripts for any local storage operaction and let data modules do that instead 
         * create new modules if needed and just import function into the view script that requires it.
         */

        /**
         * set default list's id to the id create on first time use
         */
        let defaultList = document.getElementsByClassName("todo-list")[0];

        //set id to uuid from local storage.
        defaultList.id = getItemFromLocalStorage('defaultListsUuid');

        /**
         * need to update lists before todos
         * but before even that need to change how the lists are saved
         * for now create the updateListsInTodoListsArea and call it but
         * it won't do much for now
         */
        updateListsInTodoListsArea();

        //update todo in todo area
        /**
         * set list inView as active list
         */
         let savedLists = JSON.parse(getItemFromLocalStorage('savedLists'));
         savedLists.forEach((x,index)=>{
             if(index == getItemFromLocalStorage('listInViewIndex')){
                 console.log(document.getElementById(x[0].uuid));
                 document.getElementById(x[0].uuid).click();
             }
     
            });
        
    }
});