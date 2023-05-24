import { app, auth, db } from './index.js';
import { doc, getDoc, updateDoc, collection, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { setupUI } from './view scripts/setupUI_view.js';

// mode is to get or set data from user's firestore data
async function updateUserFireStoreData(whatToUpdate, howToUpdate, data = false) {
    const userDocRef = doc(collection(db, 'users'), auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    console.log(userData, 'userData');

    //handle updating the list data for the user's todoLists data in firestore
    if (whatToUpdate == 'list') {
        switch (howToUpdate) {
            case 'newList':
                await updateDoc(userDocRef, {
                    todoLists: arrayUnion({
                        todoListData: data,
                        todoItemsData: [],
                    }),
                });
                break;
            case 'deleteList':
                let indexOfListToDelete = userData.todoLists.findIndex(list => list.todoListData.uuid === data.uuid);
                if (indexOfListToDelete >= 0) {
                    // Remove the list object from the todoLists array using FieldValue.delete()
                    await updateDoc(userDocRef, {
                        todoLists: arrayRemove(userData.todoLists[indexOfListToDelete])
                    });
                }
                break;
            case 'renameList':
                const listIndex = userData.todoLists.findIndex(list => list.todoListData.uuid === data.uuid);
                if (listIndex >= 0) {
                    const updatedLists = [...userData.todoLists];
                    updatedLists[listIndex].todoListData.listName = data.listName;
                    console.log(updatedLists, '?');
                    await updateDoc(userDocRef, { todoLists: updatedLists });
                }
                break;
            case 'retriveListData':
                return [...userData.todoLists];
                break;
            default:
                break;
        }

    }

    //
    if (whatToUpdate == 'todo-item') {
        const updatedLists = [...userData.todoLists];
        switch (howToUpdate) {
            case 'add todo':
                console.log(data.listIndex);
                updatedLists[data.listIndex].todoItemsData.push(data.todoItemData);

                await updateDoc(userDocRef, { todoLists: updatedLists });
                return true;
                break;
            case 'delete todo':
                console.log('deleted?')
                console.log(data, 'delete data');
                updatedLists[data.listIndex].todoItemsData.splice(data.todoIndex, 1);
                await updateDoc(userDocRef, { todoLists: updatedLists });
                break;
            case 'update todo':
                let indexOfTodoInSavedListsArray;
                updatedLists[localStorage.getItem('indexOfActiveListInSavedLists')]['todoItemsData'].forEach((todo, index) => {
                    if (todo.uuid == data.updatedTodo.uuid) {
                        indexOfTodoInSavedListsArray = index;
                    }
                });
                updatedLists[localStorage.getItem('indexOfActiveListInSavedLists')].todoItemsData.splice(indexOfTodoInSavedListsArray, 1, data.updatedTodo);
                await updateDoc(userDocRef, { todoLists: updatedLists });
                break;
        }
    }

    if (whatToUpdate === 'account') {
        switch (howToUpdate) {
            case 'merge':
                console.log(data, 'dataForMerge');
                console.log(data.anonymousUserDocRef, 'data.anonymousUserDocRef');

                getDoc(data.anonymousUserDocRef)
                    .then(async (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const anonymousUserData = docSnapshot.data();

                            try {
                                const mergedTodoLists = userData.todoLists.concat(anonymousUserData.todoLists);

                                await setDoc(userDocRef, { todoLists: mergedTodoLists }, { merge: true });

                                console.log('Anonymous account data merged with the existing account');

                               

                                return true;

                                // Continue with any additional logic or UI updates
                            } catch (error) {
                                console.log('Error merging anonymous account data:', error);
                            }

                        } else {
                            console.log("Document doesn't exist");
                        }
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log('error', error);
                    }).finally(()=>{
                        // Refresh the page
                        //  location.reload();
                        setupUI();
                    });
                break;
        }
    }
}

export { updateUserFireStoreData }