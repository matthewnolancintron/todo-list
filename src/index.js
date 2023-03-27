/** 
 extra features:
 recurring due dates for building habits
 every monday at 8am...
 steps/sub-tasks and sections for individule todos
 create labels for todos
 filter todos
 light and dark and green theme
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
import { updateListsInTodoListsArea } from './view scripts/updateListsInTodoListsArea_view.js';
import { encodeTodoListElementIntoTodoListObject } from './view scripts/encodeTodoListElementIntoTodoListObject_view';

//data:modules (not sure about these modules they are kind of redundant)
import { setItemAndValueInLocalStorage } from './data model scripts/setItemAndValueInLocalStorage_data.js';
import { getItemFromLocalStorage } from './data model scripts/getItemFromLocalStorage_data.js'


/** -- firebase --  */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4lhK5-F0YimGCrVrEiPkc-hihrAqVEz8",
    authDomain: "todo-web-app-a7006.firebaseapp.com",
    projectId: "todo-web-app-a7006",
    storageBucket: "todo-web-app-a7006.appspot.com",
    messagingSenderId: "1001588346863",
    appId: "1:1001588346863:web:6836306c476f145e3fb01a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * check and learn how to use:
 * Cloud Firestore
 * Authentication
 * 
 */

/**
 * add a sign in option to my todo application
 * using firebase auth 
 * 
 * todo:
 * add sign in button to the interface,
 * 
 * if user is not logged in add a sign in/sign up button to the
 * header element 
 * if the are signed in then display their user name and a
 * log out button
 * 
 * probably make a script to handle this logic
 * 
 * such as handleLoginState
 * 
 * I would check if userloged in or not here 
 * once the document is ready and then
 * set the event here using the imported
 * script and function that handles that logic
 * then write the logic in the imported file.
 * 
 */

// Initialize Firebase Authentication and get a reference to the service
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(app);

auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var userInfoContainer = document.getElementById("user-info");
        var signInButtonsContainer = document.getElementById("sign-in-buttons");

        // Display user info and options.
        userInfoContainer.style.display = "block";
        signInButtonsContainer.style.display = "none";
        userInfoContainer.innerHTML = "Welcome, " + user.displayName + "! <br> <button>Option 1</button> <button>Option 2</button> <button onclick='firebase.auth().signOut();'>Sign Out</button>";
    } else {
        // No user is signed in.
        var userInfoContainer = document.getElementById("user-info");
        var signInButtonsContainer = document.getElementById("sign-in-buttons");

        var signInButton = document.createElement('button');
        signInButton.innerText = 'Sign In/ Sign Up';
        signInButton.addEventListener("click", openPopup);
        signInButtonsContainer.appendChild(signInButton);


        // Display sign-in/sign-up buttons.
        userInfoContainer.style.display = "none";
        signInButtonsContainer.style.display = "block";

    }
});

function openPopup() {
    console.log('open something...')
    var popup = document.getElementById("popup");
    popup.style.display = "flex";

    var closePopUpButton = document.getElementById("closePopUp");
    closePopUpButton.addEventListener('click', closePopUp);

    // add event listners to the sign in and signup buttons
    // in the pop up form

    let sendEmailButton = document.getElementById('send-email-button');
    sendEmailButton.addEventListener('click', authenticateEmail)

}

function closePopUp(event) {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

window.onclick = function (event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}


// Validate email
function validateEmail() {
    // Email validation regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let email = document.getElementById("email").value;

    let errorMessage = document.getElementById("error-message");
    let emailErrorMessage = "Email address must be in the format of example@example.com.";

    if (!emailRegex.test(email)) {
        //show the error message
        errorMessage.classList.add("show");
        errorMessage.classList.remove("hide");

        //set the error message.
        errorMessage.innerHTML = emailErrorMessage;
        return false;
        //check if the error message is being displayed
    } else if (window.getComputedStyle(errorMessage).display === 'block') {
        //hide the error message
        errorMessage.classList.add("hide");
        errorMessage.classList.remove("show");
    }
    return true;
}



function authenticateEmail(event) {
    event.preventDefault(); // prevent page reload
    console.log('authenticate Email');
    if (validateEmail()) {
        // if errorMessage is showing from last attempt
        //and the validations above where not triggered
        //then hide it before moving on since validation
        //has passed.
        const email = document.querySelector('#email').value;
        console.log(email);

        //
    }

    //todo: don't foget to close popup window for user
}



/**
 * 
   update data stored and retrieved from local storage
   to instead have data for users todo information
   saved and retrieved to and from fire storage
 */
//   import {getFireStore} from 'firebase/firestore'
//   const db = getFireStore(app);;


/**
 * add offline feature:
 * 
 * 
 * advice for service that could be used for this 
 * from chatGPT:
 * Firebase offers several features that can be used for 
 * offline functionality in your web app.
 * One option is to use Cloud Firestore,
 * which provides offline data persistence.
 * With this feature, your app can continue to read and write data
 * even when it's offline, and the data will automatically sync
 * with the server once the device goes back online.
 * Another option is to use Firebase Realtime Database,
 * which also supports offline data persistence.
 * With this feature, your app can cache data locally
 * and use it even when it's offline,
 * and the data will be synchronized with the server once
 * the device goes back online.
 * In addition to these options,
 * Firebase also provides a set of offline synchronization tools
 * for handling network connectivity issues,
 * 
 * such as Firebase Offline Data Access (ODA),
 * Firebase Database Persistence,
 * and Firebase Cloud Messaging (FCM).
 * To get started with adding offline functionality
 * to your web app using Firebase,
 * you can refer to the official Firebase documentation,
 * which provides detailed guides and tutorials on implementing
 * these features in your app.
 * 
 * I'm going to use this option:
 * Cloud Firestore,
 * which provides offline data persistence.
 * With this feature, your app can continue to read and write data
 * even when it's offline, and the data will automatically sync
 * with the server once the device goes back online.
 * 
 * I'm going to check the documentation for theses:
 * Firebase Offline Data Access (ODA),
 * Firebase Database Persistence,
 * and Firebase Cloud Messaging (FCM).
 * 
 */


/** -- firebase -- */






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
        savedLists.forEach((x, index) => {
            if (index == getItemFromLocalStorage('listInViewIndex')) {
                console.log(document.getElementById(x[0].uuid));
                document.getElementById(x[0].uuid).click();
            }

        });

    }
});