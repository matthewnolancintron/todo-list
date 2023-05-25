export { setupUI }
import { addEventToAddNewListButton } from "./addEventToAddNewListButton_view";
import { addEventToRenameListButton } from "./addEventToRenameListButton_view";
import { addEventToDeleteListButton } from "./addEventToDeleteListButton_view";
import { addEventToTodoListsAddActive } from "./addEventToTodoListsAddActive_view";
import { addEventToLeftTodoListButton } from "./addEventToLeftTodoListButton_view";
import { addEventToRightTodoListButton } from "./addEventToRightTodoListButton_view";
import { addEventToCancelTodoButton } from "./addEventToCancelTodoButton_view";
import { addEventToConfirmTodoButton } from "./addEventToConfirmTodoButton_view";
import { addEventToRepeatOptions } from "./addEventToRepeatOptions_view";
import { updateUserFireStoreData } from "../updateUserFireStoreData";
import { updateListsInTodoListsArea } from "./updateListsInTodoListsArea_view";
import { addEventToAddTodoButton } from "./addEventToAddTodoButton_view";
import { encodeTodoListElementIntoTodoListObject } from "./encodeTodoListElementIntoTodoListObject_view";

const { v4: uuidv4 } = require('uuid');

async function setupUI(data) {
    // document.addEventListener('DOMContentLoaded', async() => {
    console.log('setupUI has been called');
    addEventToAddNewListButton();
    /**
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
        localStorage.getItem('listInViewIndex') == null) {
        console.log('empty localstorage need to intialize values');
        /**
        * store listInViewIndex in global storage
        */
        // setItemAndValueInLocalStorage('listInViewIndex', 0);
        localStorage.setItem('listInViewIndex', 0);

        /**
         * index of the active lists starts as the first list
         * will update via add active list func
         */
        // setItemAndValueInLocalStorage('indexOfActiveListInSavedLists', 0);
        localStorage.setItem('indexOfActiveListInSavedLists', 0);
        /**
         * intialize default appliation state:
         */

        //add unnique id to the default list
        let defaultList = document.getElementsByClassName("todo-list")[0];

        //
        defaultList.id = uuidv4();

        //
        let defaultListObject = encodeTodoListElementIntoTodoListObject(defaultList);

        try {
            //add list to userFireStore data
            await updateUserFireStoreData('list', 'newList', defaultListObject);
            if (data === 'sign out') {
                //try recalling setupUI to see if that fixes the issues
                // or could try refreshing the page automatically for user to fix ui update issue
                // setupUI();
                console.log('sign out')
                location.reload();
            }
        } catch (error) {
            console.log(error, 'error setting newList');
        }

        /**
         * set defaultLists uuid into local storage
         * need to used when refreshing application on subsquent uses
         */
        // setItemAndValueInLocalStorage('defaultListsUuid', defaultList.id);
        localStorage.setItem('defaultListsUuid', defaultList.id)
    } else {
        console.log('values already in local storage use values to update application');
        /**
         * intialize application state based on localstorage values
         */
        let a = localStorage.getItem('indexOfActiveListInSavedLists');
        let b = localStorage.getItem('listInViewIndex');

        // not sure if I really need the commented out code 
        // below just keep for now might remove later.
        /**
         * set default list's id to the id create on first time use
         */
        // let defaultList = document.getElementsByClassName("todo-list")[0];

        //
        // defaultList.id = localStorage.getItem('defaultListsUuid');
        try {
            updateListsInTodoListsArea();

            //update todo in todo area
            /**
             * set list inView as active list
             */
            let savedLists = await updateUserFireStoreData('list', 'retriveListData')
            savedLists.forEach((x, index) => {
                if (index == localStorage.getItem('listInViewIndex')) {
                    console.log(document.getElementById(x['todoListData'].uuid));
                    document.getElementById(x['todoListData'].uuid).click();
                }
            });
        } catch (error) {
            console.log(error, 'list retrival error');
        }

    }
    console.log('setupUI is finished.')
}