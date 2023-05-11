export{deleteTodoFromSavedListsArray};
import { updateUserFireStoreData } from "../updateUserFireStoreData";

function deleteTodoFromSavedListsArray(todoToDelete, indexOfListToDeleteFrom = localStorage.getItem('indexOfActiveListInSavedLists')) {  
    //delete todo from active list
    let placementOfTodoToDelete;
    
    //
    let savedLists = JSON.parse(localStorage.getItem('savedLists'));

    //find the placement of the todo to delete in the savedLists
    savedLists[indexOfListToDeleteFrom][1].forEach((x, index) => {
      if (x == todoToDelete) {
        placementOfTodoToDelete = index
      }
    });

    //
    savedLists[indexOfListToDeleteFrom][1].splice(placementOfTodoToDelete, 1);

    //
    localStorage.setItem('savedLists',JSON.stringify(savedLists));

    let dataForFireStore = {
      listIndex:indexOfListToDeleteFrom,
      todoIndex:placementOfTodoToDelete,
    }

    updateUserFireStoreData('todo-item','delete todo',dataForFireStore);
  }