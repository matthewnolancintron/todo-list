export { addEventToDeleteListButton };
import { updateListInViewIndex } from './updateListInViewIndex_view.js';
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';
import { encodeTodoListElementIntoTodoListObject } from './encodeTodoListElementIntoTodoListObject_view.js';
import { updateOptionInPlaceInListFormField } from './updateOptionInPlaceInListFormField_view.js';

async function addEventToDeleteListButton() {
  let savedLists = await updateUserFireStoreData('list', 'retriveListData');

  let deleteListButton = document.querySelector("#deleteList");
  deleteListButton.addEventListener('click', (e) => {

    //get listInViewIndex from unorder list holder 
    let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));

    //only delete list if there are lists to delete
    // can't delete list if there is one list
    if (savedLists.length > 1) {
      //console.log(savedLists.length, 'lists?')
      let listToDelete = document.querySelector('#todo-lists').children[listInViewIndex];

      //special case for default list
      if (listToDelete.dataset.default) {
        updateOptionInPlaceInListFormField('removeOption', listToDelete.textContent.trim(), listInViewIndex);
      } else {
        //update placeInList_form field options
        updateOptionInPlaceInListFormField('removeOption', listToDelete.lastChild.lastChild.textContent, listInViewIndex);
      }

      //remove todo list from data
      updateUserFireStoreData('list', 'deleteList', encodeTodoListElementIntoTodoListObject(listToDelete));

      //remove from display/dom
      listToDelete.remove();

      //update listInView
      if (listInViewIndex == (savedLists.length - 1)) {
        console.log('update list down by one?')
        updateListInViewIndex('down', 1);
      }

    } else {
      /**
       * todo: signify to user that's there are no lists to
       * delete
       * 
       * first idea:
       * where the todo lists are shown splash some text in
       * the center of it with a psudo todo list element
       * that will have a semi random text saying
       * something like no todo to delete or that doesn't work
       * could add more similar dialouge to be cycled
       * the text would animate on and off the screen
       * 
       * 
       * second idea:
       * button would shake, move or be grayed out indicating
       * that no action can be taken
       */
    }

    /**
     * when: there is more than one list
     * do: set new list in view as the active list
     * it will update the todo area clearing out the deleted
     * list's todo's and adding the list in views todo's to the
     * todo area.
    */
    // if (savedLists.length >= 1) {
    //   let newListInView = document.querySelector('#todo-lists').children[listInViewIndex-1];
    //   console.log(newListInView,'0',listInViewIndex-1,'inviewindex');
    //   newListInView.click(); // calls the add active event
    // }
  });

}