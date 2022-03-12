    export{handleTextInputStateChanges};
    import{getTodoListTitle} from './getTodoListTitle_view.js'
    import{setTodoListTitle} from './setTodoListTitle_view.js';
    import{updateOptionInPlaceInListFormField} from './updateOptionInPlaceInListFormField_view.js'

    /**
     * function takes a particular textInput
     * and put into the correct state and 
     * add the proper event listners for interaction
     */
     function handleTextInputStateChanges(textInputForTodoListItem) {
       let savedLists = JSON.parse(localStorage.getItem('savedLists'));
        //setting state
        textInputForTodoListItem.focus();
        textInputForTodoListItem.scrollIntoView(false);
  
        //adding event listner blur
        textInputForTodoListItem.addEventListener('blur', (e) => {
  
          //
          let name = getTodoListTitle(e.target.value);
          setTodoListTitle(e.target.parentElement.parentElement, name);
          //after name is decided,
          //update placeInList_form field options
          updateOptionInPlaceInListFormField('addOption', name, savedLists.length - 1);
        });
  
        /**
         * if there is content in the text input
         * and the user un focuses or presses the enter key
         * then that text will become the title of the todo lists
         */
        textInputForTodoListItem.addEventListener("keyup", (e) => {
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
  
      }