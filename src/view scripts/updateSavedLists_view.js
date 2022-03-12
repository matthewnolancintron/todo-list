    export{updateSavedLists};
    import{updateOptionInPlaceInListFormField} from './updateOptionInPlaceInListFormField_view.js';

    //used to help the intened data model and view insync
    function updateSavedLists(list, updateMethod) {
      //get savedLists from local storage
      let savedLists = JSON.parse(localStorage.getItem('savedLists'));
      
      //  
      switch (updateMethod) {
          case 'newList':
            savedLists.push([list, []]);
            break;
          case 'deleteList':
            let indexOfElementToDelete;
            //find index of element to be deleted:
            savedLists.forEach((x, index) => {
              if (x[0] == list) {
                indexOfElementToDelete = index;
              }
            });
            //update placeInList_form field options
  
            //special case for default list
            if (savedLists[indexOfElementToDelete][0].textContent.trim() == 'default list') {
              //check if it's the real default or just a user created default
              if (savedLists[indexOfElementToDelete][0].dataset.default == 'true') {
                //is true default
                updateOptionInPlaceInListFormField('removeOption', savedLists[indexOfElementToDelete][0].textContent.trim(), indexOfElementToDelete);
              } else {
                //not actual default treat like anyother user made list
                updateOptionInPlaceInListFormField('removeOption', savedLists[indexOfElementToDelete][0].lastChild.lastChild.textContent, indexOfElementToDelete);
              }
  
            } else {
              updateOptionInPlaceInListFormField('removeOption', savedLists[indexOfElementToDelete][0].lastChild.lastChild.textContent, indexOfElementToDelete);
            }
  
            //delete
            savedLists.splice(indexOfElementToDelete, 1);
            break;
          default:
            break;
        }
      
      //update local storage
      localStorage.setItem('savedLists',JSON.stringify(savedLists));

      }