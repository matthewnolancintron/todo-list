export { updateSavedLists };
import { encodeTodoListElementIntoTodoListObject } from './encodeTodoListElementIntoTodoListObject_view.js';
import { updateOptionInPlaceInListFormField } from './updateOptionInPlaceInListFormField_view.js';
import {updateUserFireStoreData} from '../updateUserFireStoreData.js'

//used to help the intened data model and view insync
function updateSavedLists(list, updateMethod) {
  /*
   * encode list element into list object 
   */
  let listObject = encodeTodoListElementIntoTodoListObject(list);

  //get savedLists from local storage
  let savedLists = JSON.parse(localStorage.getItem('savedLists'));

  updateUserFireStoreData('list',updateMethod,listObject);

  //  
  switch (updateMethod) {
    case 'newList':
      savedLists.push([listObject, []]);
      break;
    case 'deleteList':
      let indexOfListToDelete;
      savedLists.forEach((element, index) => {
        if (element[0].uuid == listObject.uuid) {
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
      savedLists.splice(indexOfListToDelete, 1);

      break;
    case 'renameList':
      console.log('update list rename it in savedLists Array');
      /**
       * find location of list in savedLists and update the listName Property
       */
      savedLists.forEach((list, index) => {
        if (list[0].uuid == listObject.uuid) {
          list[0].listName = listObject.listName;
        }
      });
      break;
    default:
      break;
  }

  //update local storage
  localStorage.setItem('savedLists', JSON.stringify(savedLists));
}