export{updateListsInTodoListsArea}
import {decodeListIntoTodoListElement} from './decodeTodoListObjectIntoTodoListElement_view.js'
import {addEventToTodoListsAddActive} from './addEventToTodoListsAddActive_view.js';
import {updateOptionInPlaceInListFormField} from './updateOptionInPlaceInListFormField_view.js'
import { updateUserFireStoreData } from '../updateUserFireStoreData.js';

async function updateListsInTodoListsArea(){
    /**
     * clear default list 
     */
    document.querySelector("#todo-lists").children[0].remove();
    console.log(document.querySelector("#todo-lists").children,'7');

    /**
     * clear default list option in place in list form field
     */
     updateOptionInPlaceInListFormField("removeOption", 'default list', 0);


    /**
     * loop through saved lists retrieve all the lists
     * in the array and decode them and add them to the lists 
     * element or replace lists element with them
     */    
    let savedLists = await updateUserFireStoreData('list','retriveListData');

    savedLists.forEach((x,index)=>{
        document.querySelector("#todo-lists").append(decodeListIntoTodoListElement(x['todoListData']));
        //also need to update the place in list form field options
        //during the update lists during each list make sure to update a list option as if adding new lists
        updateOptionInPlaceInListFormField("addOption", x['todoListData'].listName, index);
    });

    //after all have been added to the dom
    addEventToTodoListsAddActive();

}