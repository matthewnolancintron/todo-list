    export{updateMoveTodoOptions};
    import {updateMoveTodoToList} from './updateMoveTodoToList_view.js'

    //updateMoveTodoOptions when switching lists
    function updateMoveTodoOptions() {
        let indexOfActiveListInSavedLists = localStorage.getItem('indexOfActiveListInSavedLists');
        let placeInList_todoArr = document.getElementsByClassName("placeInList_todo") || '';
        placeInList_todoArr = Array.from(placeInList_todoArr);
        if (placeInList_todoArr != '') {
          placeInList_todoArr.forEach((element) => {
            let updatedElement = document.getElementById('placeInList_form').cloneNode(true);
            console.log(element.value, 'element.value');
            console.log(updatedElement.value, 'updated.value');
  
            updatedElement.id = "placeInList_todo";
            updatedElement.name = "placeInList_todo";
            updatedElement.classList.add('placeInList_todo');
  
            //set the elements option to the list it was moved to
            //need index of list it was moved to
            updatedElement.value = element.value;
  
            updatedElement.addEventListener('change', (e) => {
              console.log('change');
              console.log(e,'e');
              console.log(indexOfActiveListInSavedLists,'indexOfactiveListInSaveLists');
              updateMoveTodoToList(e);
            });
  
            //
            element.replaceWith(updatedElement);
  
          });
        }
        console.log('after change code', indexOfActiveListInSavedLists)
      }