export{updateIndexOfActiveListInSavedLists};

//used in addActiveListEventToList
   function updateIndexOfActiveListInSavedLists() {
    let savedLists = JSON.parse(localStorage.getItem('savedLists')); 
    savedLists.forEach((x, index) => {
      if (x[0].classList.contains("todo-list_activeList")) {
        //not sure if update is correct
        localStorage.setItem('indexOfActiveListInSavedLists',index);
      }
    });
  }