import { updateUserFireStoreData } from "../updateUserFireStoreData";

export{updateIndexOfActiveListInSavedLists};

//used in addActiveListEventToList
  async function updateIndexOfActiveListInSavedLists() {
    let savedLists = await updateUserFireStoreData('list','retriveListData');
    savedLists.forEach((x, index) => {
      if (document.getElementById(x['todoListData'].uuid).classList.contains("todo-list_activeList")) {
        //not sure if update is correct
        localStorage.setItem('indexOfActiveListInSavedLists',index);
      }
    });
  }