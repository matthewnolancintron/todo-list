export { updateSavedLists };
import { updateOptionInPlaceInListFormField } from './updateOptionInPlaceInListFormField_view.js';

//used to help the intened data model and view insync
function updateSavedLists(list, updateMethod) {
  console.log(list, 'list?')
  //get savedLists from local storage
  let savedLists = JSON.parse(localStorage.getItem('savedLists'));
  console.log(savedLists, 'savedListsFrom local storage');

  /**
   * turn savedLists from string into an array
   */

  //  
  switch (updateMethod) {
    case 'newList':
      savedLists.push([list.id, []]);
      break;
    case 'deleteList':
      let indexOfListToDelete;
      savedLists.forEach((element, index) => {
        if (element[0] == list.id) {
          indexOfListToDelete = index;
        }
      });

      //special case for default list
      if (list.dataset.default) {
        updateOptionInPlaceInListFormField('removeOption', list.textContent.trim(), indexOfListToDelete);
      } else {
        //update placeInList_form field options
        updateOptionInPlaceInListFormField('removeOption', list.lastChild.lastChild.textContent, indexOfListToDelete);
      }

      //filter out the list.id being deleted
      //savedLists = savedLists.filter(element => element.id != list.id);
      savedLists.splice(indexOfListToDelete,1);

      break;
    default:
      break;
  }

  //update local storage
  localStorage.setItem('savedLists', JSON.stringify(savedLists));

}