import { app, auth, db } from './index.js';
import { doc, getDoc, updateDoc, collection, arrayUnion, arrayRemove } from "firebase/firestore";

// mode is to get or set data from user's firestore data
async function updateUserFireStoreData(whatToUpdate, howToUpdate, data = false) {
    const userDocRef = doc(collection(db, 'users'), auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();

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
            default:
                break;
        }

    }

    //
    if (whatToUpdate == 'todo-item') {
        const updatedLists = [...userData.todoLists];
        switch (howToUpdate) {
            case 'add todo':
                console.log('something?')
                updatedLists[data.listIndex].todoItemsData.push(data.todoItemData);
                console.log(updatedLists,'updated?')
                await updateDoc(userDocRef, { todoLists: updatedLists });
                return true;
                break;
            case 'delete todo':
                console.log('deleted?')
                updatedLists[data.listIndex].todoItemsData.splice(data.todoIndex,1);
                await updateDoc(userDocRef,{todoLists:updatedLists});
                break;
            case 'update todo':
                //currently the event listner for the collapse and save
                //todo isn't working 
                updatedLists[data.listIndex].todoItemsData.splice(data.todoIndex,1,data.updatedTodo);
                await updateDoc(userDocRef,{todoLists:updatedLists});
                break;
        }
    }

}

export { updateUserFireStoreData }