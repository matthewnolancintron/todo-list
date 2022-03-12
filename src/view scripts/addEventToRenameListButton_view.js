export{addEventToRenameListButton};
import{renameList} from './renameList_view';
import{getTodoListTitle} from './getTodoListTitle_view.js';
import{setTodoListTitle} from './setTodoListTitle_view.js';
import{updatePlaceInListFormFieldOnListRename} from './updatePlaceInListFormFieldOnListRename_view.js';

function addEventToRenameListButton(listInViewIndex){
    //rename a list
    /**
     * fix: when renaming lists |  style issue:
     * if name for elements becomes small
     * on more than a couple of elements
     * the size of the list items will shrink
     * causing issues find root of issues
     * and find solution
     * 
     * probable cause is that the text item's title
     * doesn't have a set size and just scales down
     * to the text so just give it a set size so
     * the scaling doesn't cause issues with the layout.
     */
     let renameListButton = document.querySelector("#renameList");
     renameListButton.addEventListener('click', (e) => {
       let todoLists = document.querySelector('#todo-lists');
 
       let renamedList = renameList(todoLists.children[listInViewIndex]);
 
       let textInputForTheRenamedList = renamedList.children[0].children[0];
 
       textInputForTheRenamedList.focus();
       renamedList.scrollIntoView(false);
 
       textInputForTheRenamedList.addEventListener('blur', (e) => {
         //
         let name = getTodoListTitle(e.target.value);
 
         //
         setTodoListTitle(renamedList, name);
 
         /*
         * need both add todo form and todo move to list to 
         * update when user renames the list. 
         */
         updatePlaceInListFormFieldOnListRename(listInViewIndex, name);
 
       });
 
       /**
        * if there is content in the text input
        * and the user un focuses or presses the enter key
        * then that text will become the title of the todo lists
        */
       textInputForTheRenamedList.addEventListener("keyup", (e) => {
         if (e.key == "Enter") {
           e.target.blur();
           /**
           or
           let name = getTodoListTitle(e.target.value);
 
           //
           setTodoListTitle(todoListItem,name);
 
           ?
 
           or move the above into parent function and use
           same function for both blur and enter events?
            */
 
         }
       });
 
     });
}