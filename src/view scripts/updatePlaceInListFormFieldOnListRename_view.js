export{updatePlaceInListFormFieldOnListRename};
import{updateMoveTodoOptions}  from './updateMoveTodoOptions_view.js'

//
function updatePlaceInListFormFieldOnListRename(indexOfRenamedList, updatedName) {
    console.log(indexOfRenamedList, 'list renamed');
    let formFieldToUpdate = document.getElementById('placeInList_form');
    let options = formFieldToUpdate.children;
    let optionToUpdate = Array.from(options).find(element => element.value == indexOfRenamedList);
    optionToUpdate.textContent = updatedName;

    //call function to update todos move list option sync
    updateMoveTodoOptions();
}