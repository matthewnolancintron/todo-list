import { updateUserFireStoreData } from "../updateUserFireStoreData";

export{updateIndexOfActiveListInSavedLists};

//used in addActiveListEventToList
  async function updateIndexOfActiveListInSavedLists() {

    try {
      let savedLists = await updateUserFireStoreData('list','retriveListData');
      console.log(savedLists)
      
      savedLists.forEach((x, index) => {
        // console.log(x,'x');
        console.log("x['todoListData'].uuid", x['todoListData'].uuid);
        console.log(document.getElementById(x['todoListData'].uuid), 'element');

        // console.log()
        if (document.getElementById(x['todoListData'].uuid).classList.contains("todo-list_activeList")) {
          //not sure if update is correct
          console.log()
          localStorage.setItem('indexOfActiveListInSavedLists',index);
        }
      });


    } catch (error) {
      console.log('error',error);
    }

  }

  