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

/** -- firebase imports --  */
import { initializeApp } from "firebase/app";

// Initialize Firebase Authentication and get a reference to the service
import {
    getAuth,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    signOut,
    connectAuthEmulator,
    updateProfile,
} from 'firebase/auth'

import {
    getFirestore,
    connectFirestoreEmulator,
    collection,
    doc,
    setDoc,
    getDocs,
    updateDoc,
    where,
    query,
    arrayUnion,
    getDoc,
} from "firebase/firestore";
import { updateUserFireStoreData } from './updateUserFireStoreData';

//web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_xtUqcZkwGDz3mvr6Q6TR0qyEYmUlGSs",
    authDomain: "todo-ab6e0.firebaseapp.com",
    projectId: "todo-ab6e0",
    storageBucket: "todo-ab6e0.appspot.com",
    messagingSenderId: "589279456370",
    appId: "1:589279456370:web:47ae5656b228012ac0a6eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect firebase emulators
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const { v4: uuidv4 } = require('uuid');

//when dom has loaded do stuff.
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(async function (user) {
        const signInButtonContainer = document.getElementById("sign-in-buttons");
        const signOutButtonContainer = document.getElementById("sign-out-button-section")
        if (user) {// User is signed in.
            const { displayName, email, uid } = user;
            /**
             * checking if user document with user data is already in
             * users collection if not creating a new document and 
             * creating userData then adding it to the user collection.
             */
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                let isUserDataInUsersCollection;

                querySnapshot.forEach((doc) => {
                    if (doc.id === uid) {
                        isUserDataInUsersCollection = true;
                    }
                });

                //if user is not in users collection
                if (!isUserDataInUsersCollection) {
                    /**
                     * create user data and add it to a new document
                     * add that document to the users collection
                     */

                    // reference to users collection in firestore database
                    const usersCollectionRef = collection(db, 'users');

                    //create usersData object
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        todoLists: []
                    }

                    //create new document in usersCollection 
                    // that has document id set to the users uid from auth
                    const userDocumentRef = doc(usersCollectionRef, uid);

                    //set usersData to the newly added user document
                    await setDoc(userDocumentRef, userData);
                }

            } catch (e) {
                console.log(e);
            }

            //if display name is null prompt user to set display name
            if (!user.displayName) {
                openPopup('setUserName');
            } else {
                handleUserInfoDisplay('show');
            }

            //hide sign-in/sign-up buttons
            signInButtonContainer.classList.remove('show');
            signInButtonContainer.classList.add('hide');

            //create and addEventListner to sign out button
            let signOutButton = document.createElement('button');
            signOutButton.innerText = 'Sign out';
            signOutButton.addEventListener('click', () => {
                signOut(auth).then(() => {
                    // Sign-out successful.
                    //remove signout button from display:
                    signOutButtonContainer.classList.remove('show');
                    signOutButtonContainer.classList.add('hide');
                }).catch((error) => {
                    // An error happened.
                });
            });

            signOutButtonContainer.appendChild(signOutButton);

            //display the signOutButton Container
            signOutButtonContainer.classList.remove('hide');
            signOutButtonContainer.classList.add('show');

            // Get a reference to the current user's document in the 'users' collection
            const userDocRef = doc(collection(db, 'users'), uid);

            const userDocSnap = await getDoc(userDocRef);

            const userData = userDocSnap.data();

            //if the todoLists data is empty
            if (userData.todoLists.length == 0) {
                // Create the default list object
                const defaultList = document.getElementsByClassName("todo-list")[0];
                defaultList.id = uuidv4();
                const defaultListObject = encodeTodoListElementIntoTodoListObject(defaultList);

                // Add the default list object to the user's todo data
                await updateDoc(userDocRef, {
                    todoLists: arrayUnion({
                        todoListData: defaultListObject,
                        todoItemsData: [],
                    }),
                });
            }

            // Call the function to set up the UI events and functions that require userDocSnap
            setupUI();

        } else {// No user is signed in.
            //create and addEventListner to sign in / sign up button
            let signInButton = document.getElementById('signInSignUpButton');

            signInButton.addEventListener("click", () => { openPopup("signUpSignIn") });
            signInButtonContainer.appendChild(signInButton);


            //hide userInfoContainer
            handleUserInfoDisplay('hide');

            // Display sign-in/sign-up button.
            signInButtonContainer.classList.remove('hide');
            signInButtonContainer.classList.add('show');


            // Call the function to set up the default UI configuration
            setupDefaultUI();
        }
    });

    function openPopup(type) {
        //
        let popup = document.getElementById(`popup_${type}`);
        popup.classList.remove('hide');
        popup.classList.add('show_flex');

        if (type === "signUpSignIn") {
            //
            let closePopUpButton = document.getElementById(`closePopUp_${type}`);
            closePopUpButton.addEventListener('click', () => { closePopUp(`${type}`) });

            let sendEmailButton = document.getElementById('send-email-button');
            sendEmailButton.addEventListener('click', emailAuthenticationLink);
        }

        if (type === "setUserName") {
            const setUserNameForm = document.querySelector('#setUserName_form');
            setUserNameForm.addEventListener('submit', (event) => {
                event.preventDefault();
                event.stopPropagation();
                handleSetUserName();
                return false;
            });

            let setDisplayNameButton = document.getElementById("setDisplayName");
            setDisplayNameButton.addEventListener('click', handleSetUserName);
            let remindMeLaterButton = document.getElementById("remindMeLater");
            remindMeLaterButton.addEventListener('click', handleSetUserName);
        }


    }

    function closePopUp(type) {
        let popup = document.getElementById(`popup_${type}`);
        popup.classList.remove('show_flex');
        popup.classList.add('hide');
    }

    // Validate email
    function validateEmail(email) {
        // Email validation regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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

    function emailAuthenticationLink(event) {
        event.preventDefault(); // prevent page reload
        const email = document.querySelector('#email').value;
        const isEmailValid = validateEmail(email); //is true or false.

        if (isEmailValid) {
            //email is valid can continue the process
            const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: 'http://127.0.0.1:5500',
                // This must be true.
                handleCodeInApp: true,
            };

            sendSignInLinkToEmail(auth, email, actionCodeSettings)
                .then(() => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', email);

                    // Confirm the link is a sign-in with email link.
                    if (isSignInWithEmailLink(auth, window.location.href)) {
                        // Additional state parameters can also be passed via URL.
                        // This can be used to continue the user's intended action before triggering
                        // the sign-in operation.
                        // Get the email if available. This should be available if the user completes
                        // the flow on the same device where they started it.
                        let email = window.localStorage.getItem('emailForSignIn');
                        if (!email) {
                            // User opened the link on a different device. To prevent session fixation
                            // attacks, ask the user to provide the associated email again. For example:
                            email = window.prompt('Please provide your email for confirmation');
                        }
                        // The client SDK will parse the code from the link for you.
                        signInWithEmailLink(auth, email, window.location.href)
                            .then((result) => {
                                // Clear email from storage.
                                window.localStorage.removeItem('emailForSignIn');
                                // You can access the new user via result.user
                                // Additional user info profile not available via:
                                // result.additionalUserInfo.profile == null
                                // You can check if the user is new or existing:
                                // result.additionalUserInfo.isNewUser
                            })
                            .catch((error) => {
                                // Some error occurred, you can inspect the code: error.code
                                // Common errors could be invalid email and invalid or expired OTPs.
                                console.log('sign in failed')
                            });
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('send link failed')
                    console.log(errorMessage);
                    console.log(errorCode);
                });


        }
        //todo: don't foget to close popup window for user
        closePopUp("signUpSignIn");
    }

    function handleUserInfoDisplay(type) {
        const userInfoContainer = document.getElementById("user-info");
        if (type === 'show') {
            userInfoContainer.classList.remove("hide");
            userInfoContainer.classList.add("show");

            //set content for userInfo
            userInfoContainer.innerHTML = auth.currentUser.displayName;
        }

        if (type === 'hide') {
            userInfoContainer.classList.remove('show');
            userInfoContainer.classList.add('hide');
        }
    }

    async function handleSetUserName(event) {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.id === `setDisplayName`) {
            //set content for userInfo
            // userInfoContainer.innerHTML = user.displayName;
            const userName = document.querySelector('#userName').value;
            const errorMessage = document.getElementById("error-message_setUserName");
            try {
                const isUserNameValid = await validateUserName(userName);
                console.log('isUserNameValid', isUserNameValid);
                if (isUserNameValid.valid) {
                    //hide the error message jsut incase its showing
                    errorMessage.classList.remove("show");
                    errorMessage.classList.add("hide");
                    // Update the user's display name
                    updateProfile(auth.currentUser, {
                        displayName: userName
                    }).then(async function () {
                        // Display name updated successfully
                        //update user data in firestore
                        const userRef = doc(db, "users", auth.currentUser.uid);

                        await updateDoc(userRef, {
                            displayName: userName
                        });

                        /**close the pop ups */
                        closePopUp("setUserName");
                        closePopUp("signUpSignIn");

                        // Display user info and options.
                        handleUserInfoDisplay('show');

                        //hide set username button if needed
                        const setUserNameButtonSection = document.getElementById("setUser-button-section");

                        if (setUserNameButtonSection.classList.contains('show')) {
                            setUserNameButtonSection.classList.remove('show');
                            setUserNameButtonSection.classList.add('hide');
                        }

                    }).catch((error) => {
                        // Error updating display name
                        console.log(error, 'updateProfile Error');
                    });


                } else {
                    //username is not valid show error to user
                    //show the error message
                    errorMessage.classList.add("show");
                    errorMessage.classList.remove("hide");

                    //set the error message.
                    errorMessage.innerHTML = isUserNameValid.error;
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (event.target.id === `remindMeLater`) {
            // instead of setting a username 
            //show a button that opens the pop up for setting username
            // with a message right next to it.
            const setUserNameButtonSection = document.getElementById("setUser-button-section");
            let setUserNameButton = document.getElementById("setUserNameButton");

            setUserNameButton.innerText = 'setUserName';
            setUserNameButton.addEventListener('click', () => {
                openPopup('setUserName');
            });

            setUserNameButtonSection.appendChild(setUserNameButton);

            //display the signOutButton Container
            setUserNameButtonSection.classList.remove('hide');
            setUserNameButtonSection.classList.add('show');

            closePopUp('setUserName');
        }

        return false;
    }

    async function isDisplayNameNotAvailable(displayName) {
        try {

            // Construct a reference to the 'users' collection
            const usersRef = collection(db, 'users');

            // Construct a query for documents where the 'displayName' field is equal to the provided display name
            const q = query(usersRef, where('displayName', '==', displayName));

            // Execute the query and get a snapshot of the results
            const querySnapshot = await getDocs(q);

            // Check if any documents were returned from the query
            if (!querySnapshot.empty) {
                // Username is already taken
                console.log('Username is not available');
                return true;
            }

            // Username is available
            console.log('Username is available');
            return false;
        } catch (error) {
            // Error querying Firestore
            console.log('Error querying Firestore: ', error);
        }
    }

    async function validateUserName(username) {
        console.log(username);
        try {
            const isUserNameNotAvalible = await isDisplayNameNotAvailable(username);
            console.log(isUserNameNotAvalible);
            if (isUserNameNotAvalible) {
                // username is already taken
                return { valid: false, error: 'Username is already taken' };
            } else if (username.length < 3 || username.length > 20) {
                // username is too short or too long
                return { valid: false, error: 'Username must be between 3 and 20 characters' };
            } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
                // username contains invalid characters
                return { valid: false, error: 'Username may only contain letters, numbers, underscores, or hyphens' };
            } else {
                // username is valid
                return { valid: true };
            }

        } catch (error) {
            // handle error
            console.error(error);
            return { valid: false, error: 'An error occurred while validating the username' };
        }
    }

    // Define a function to set up the UI events and call functions that require userDocSnap
    async function setupUI() {
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
            localStorage.getItem('listInViewIndex') == null ||
            localStorage.getItem('savedLists') == null
        ) {
            console.log('empty localstorage need to intialize values');

            console.log(db, 'db');

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
            let savedLists = await updateUserFireStoreData('list','retriveListData')
            savedLists.forEach((x, index) => {
                if (index == getItemFromLocalStorage('listInViewIndex')) {
                    console.log(document.getElementById(x['todoListData'].uuid));
                    document.getElementById(x['todoListData'].uuid).click();
                }
            });
        }
    }

    function setupDefaultUI() {
        console.log('defaultUI');

        addEventToAddNewListButton();

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

            console.log(db, 'db');

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

    }
});

export {app,auth,db}