export{deleteTodoFromSavedListsArray};
import { updateUserFireStoreData } from "../updateUserFireStoreData";

async function deleteTodoFromSavedListsArray(todoToDelete, indexOfListToDeleteFrom = localStorage.getItem('indexOfActiveListInSavedLists')) {  
    //delete todo from active list
    let placementOfTodoToDelete;
    
    let savedLists = await updateUserFireStoreData('list','retriveListData');

    console.log(todoToDelete.dataset.uuid,'todoToDelete')
    //find the placement of the todo to delete in the savedLists
    savedLists[indexOfListToDeleteFrom]['todoItemsData'].forEach((x, index) => {
      if (x.uuid == todoToDelete.dataset.uuid) {
        placementOfTodoToDelete = index;
      }
    });


    //
    savedLists[indexOfListToDeleteFrom]['todoItemsData'].splice(placementOfTodoToDelete, 1);

    let dataForFireStore = {
      listIndex:indexOfListToDeleteFrom,
      todoIndex:placementOfTodoToDelete,
    }

    updateUserFireStoreData('todo-item','delete todo',dataForFireStore);
  }