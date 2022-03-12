    export{addActiveListEventToList};
    import{updateIndexOfActiveListInSavedLists} from './updateIndexOfActiveListInSavedLists_view.js';
    import{updateTodosInTodoArea} from './updateTodoInTodoArea_view.js'
    import{updateMoveTodoOptions} from './updateMoveTodoOptions_view.js';

    //takes a todo list item
    // and attaches event listner for active list functionality
    function addActiveListEventToList(elementToAttachEventTo) {
        elementToAttachEventTo.addEventListener('click', (e) => {
          let targets;
          let target;
          let indexOfActiveListInSavedLists = localStorage.getItem('indexOfActiveListInSavedLists');
          /**
           * if e.target it the title element make sure 
           * not to add active list class to the title and
           * instead navigate to the list item and add it to that
           */
          if (e.target.classList.contains("todoList_title")) {
            //
            //console.log(e.target.parentElement.parentElement.parentElement.children, '0');
            targets = e.target.parentElement.parentElement.parentElement.children;
            target = e.target.parentElement.parentElement;
          }
  
          /**
           * 
           * if e.target is the list item then just add it like
           * before
           */
          if (e.target.classList.contains("todo-list")) {
            targets = e.target.parentElement.children
            target = e.target;
          }
  
          //remove active from all todo-list elements first
          for (let index = 0; index < targets.length; index++) {
            const element = targets[index];
            //console.log(element);
            if (element.classList.contains("todo-list_activeList")) {
              element.classList.remove("todo-list_activeList");
            }
          }
          // add active to element that was clicked
          target.classList.add("todo-list_activeList");
  
          /**
           * call function that finds the index of the active list
           * in the savedLists array and sets it to a global var
           * indexOfactiveListInSaveLists
           */
          console.log(indexOfActiveListInSavedLists,'in add active function')

          updateIndexOfActiveListInSavedLists();
          let newIndexOfactiveListInSaveLists = localStorage.getItem('indexOfActiveListInSavedLists');

          console.log(newIndexOfactiveListInSaveLists,'newIndexOfactiveListInSaveLists');
          //updates the todo in the todo area to match the active list
          updateTodosInTodoArea();
  
          //update move todo to list option, that are now out of sync
          updateMoveTodoOptions();
        });
        //
  
      }