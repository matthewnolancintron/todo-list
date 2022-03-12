export{deleteTodoFromSavedListsArray};

function deleteTodoFromSavedListsArray(todoToDelete, indexOfListToDeleteFrom = localStorage.getItem('indexOfActiveListInSavedLists')) {
    //delete todo from active list
    let placementOfTodoToDelete;
    
    //
    let savedLists = JSON.parse(localStorage.get('savedLists'));

    //find the placement of the todo to delete in the savedLists
    savedLists[indexOfListToDeleteFrom][1].forEach((x, index) => {
      if (x == todoToDelete) {
        placementOfTodoToDelete = index
      }
    });
    savedLists[indexOfListToDeleteFrom][1].splice(placementOfTodoToDelete, 1);

    //
    localStorage.setItem('savedLists',JSON.stringify(savedLists));
  }