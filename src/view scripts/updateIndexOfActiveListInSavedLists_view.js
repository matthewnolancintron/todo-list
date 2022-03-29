export{updateIndexOfActiveListInSavedLists};

//used in addActiveListEventToList
   function updateIndexOfActiveListInSavedLists() {
    let savedLists = JSON.parse(localStorage.getItem('savedLists')); 
    savedLists.forEach((x, index) => {
      console.log(x[0],'?')
      if (document.getElementById(x[0].uuid).classList.contains("todo-list_activeList")) {
        //not sure if update is correct
        localStorage.setItem('indexOfActiveListInSavedLists',index);
      }
    });
  }