/**
 * split view into multiple moduals/files
 * and import into view
 */
/**
 * export functions from view to be used by
 * index.js(controller)
 */
export { View };

function View() {
  document.addEventListener('DOMContentLoaded', () => {
    //active list by default (will soon be the last list the user had as active)
    let defaultList = document.getElementsByClassName("todo-list")[0];
    document.body.addEventListener('contextmenu', () => {
      //used for debugging

      //check savedLists value in the console
      //console.log(`savedLists == ${savedLists}`, savedLists);

      //first list in the saved lists array
      //console.log(`savedLists[0][0].outerHTML == ${savedLists[0][0].outerHTML}`);

    });

    //array of list elements and the todo that belong to them.
    let savedLists = [
      [defaultList, []],
    ];

    /**
     * index of the active lists starts as the first list
     * will update via add active list func
     */
    let indexOfactiveListInSaveLists = 0;

    //forget what depends on this update comment later.
    function updateindexOfactiveListInSaveLists() {
      savedLists.forEach((x, index) => {
        if (x[0].classList.contains("todo-list_activeList")) {
          indexOfactiveListInSaveLists = index;
        }
      });
    }

    //used to help the intened data model and view insync
    function updateSavedLists(list, updateMethod) {
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

    }

    //updates the todo area when the active list is changed
    function updateTodosInTodoArea() {
      /**
        it depeneds on the active list
        call this when the active list changes
        check that function out and find where to call this 
        when from there...
       */
      let todoItems = document.getElementsByClassName("todo-items")[0].children;
      let todoItemList = document.getElementsByClassName("todo-items")[0];
      let todoItemsAtStartLength = todoItems.length;

      //clear todo's
      /**
       * clear todos from todo area in the todo list
       */
      for (let i = todoItemsAtStartLength; i--;) {
        todoItems.item(i).remove()
      }

      /**
       * add todos back to the todo area in the todo list
       * by adding todos that were saved to the active list
       * in the savedLists array
       */
      savedLists.forEach((x) => {
        if (x[0].classList.contains("todo-list_activeList")) {
          x[1].forEach((y) => {
            todoItemList.append(y);
          });
        }
      });
    }

    /**start todo List funtionality */
    // add new list
    let addNewListButton = document.querySelector("#addNewList");
    //console.log("addNewList", addNewListButton);
    addNewListButton.addEventListener('click', (e) => {
      let todoListItem = document.createElement("li");
      todoListItem.classList.add("todo-list");

      //pass todo list item to function to add 
      //the event listner for handling active list
      addActiveListEventToList(todoListItem);

      let todoItemSizingContainer = document.createElement('div');
      todoItemSizingContainer.classList.add('todoItemSizingContainer');
      todoListItem.append(todoItemSizingContainer);


      todoListItem = renameList(todoListItem);

      //save newly create todo list to savedLists array
      updateSavedLists(todoListItem, 'newList');

      //adding todo list to dom
      document.querySelector("#todo-lists").append(todoListItem);

      let textInputForThisParticularTodoListItem = todoListItem.children[0].children[0];

      /**
       * passing the text input for the newly added todo list
       * to the handleTextInputStateChanges function.
       */
      handleTextInputStateChanges(textInputForThisParticularTodoListItem);

      /**
        * update by the lengh of the list minus it's current index plus 1
        * 
        * list size = 3
        * starts on index 0
        * adds new list
        * list size is now 4
        * listinviewindex should equal 3
        * update index 0 to 3
        * 0(current index/listinviewIndex) 
        * + listLength(4)-(listInViewIndex(0)+1) = 3
        * 
        * 
        * if at index 1 when adding new list
        * and list size is still 3
        * adds new list set list length to 4
        * listInViewShould now equal 3
        * update index 1 to 3
        * 1(listInViewIndex) +
        * listLength(4)-(listInViewIndex(1)+1) = amount value
        * 1+ amount value = updated value
        * amount value = 2
        * 1+amount value = 3
        * 
        * formula for the amount value being passed into the function
        * for updating listInViewIndex when adding newList is
        * (listLength of the lists) - (listInViewIndex+1)
        */
      //console.log('value of listLength of lists',document.querySelector('#todo-lists').childElementCount);
      let listOfListsLength = document.querySelector('#todo-lists').childElementCount;
      updateListInViewIndex('up', (listOfListsLength - (listInViewIndex + 1)));
    });
    //


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

    //delete a list
    let deleteListButton = document.querySelector("#deleteList");
    deleteListButton.addEventListener('click', (e) => {
      //only delete list if there are lists to delete
      // can't delete list if there is one list
      if (savedLists.length > 1) {
        //console.log(savedLists.length, 'lists?')
        let listToDelete = document.querySelector('#todo-lists').children[listInViewIndex];

        //remove todo list from savedLists array
        updateSavedLists(listToDelete, 'deleteList');

        //remove from display/dom
        listToDelete.remove();

        //update listInView
        if (listInViewIndex == savedLists.length) {
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
      if (savedLists.length >= 1) {
        let newListInView = document.querySelector('#todo-lists').children[listInViewIndex];
        newListInView.click(); // calls the add active event
      }
    });

    //gets name for todoList title
    function getTodoListTitle(nameFromUser) {
      let name;

      //check if the user entered a name/title
      if (nameFromUser.length == 0) {
        //input is empty, set name to placeholder
        //todo:create random name generator for the placeholder
        name = "placeholder";
      } else {
        //input is not empty, set name to what's in the input
        name = nameFromUser;
      }

      return name;

    }

    //set todoList title
    function setTodoListTitle(todoListItem, name) {
      /**
       * remove/replace the textInput with title 
      */

      //  create title element to replace text input with
      let todoList_title = document.createElement('p');
      todoList_title.classList.add("todoList_title");
      todoList_title.textContent = name;

      todoListItem.children[0].children[0].replaceWith(todoList_title);
    }

    //takes a todo list item
    // and attaches event listner for active list functionality
    function addActiveListEventToList(elementToAttachEventTo) {
      elementToAttachEventTo.addEventListener('click', (e) => {
        let targets;
        let target;
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
        updateindexOfactiveListInSaveLists();

        //updates the todo in the todo area to match the active list
        updateTodosInTodoArea();

        //update move todo to list option, that are now out of sync
        updateMoveTodoOptions();
      });
      //

    }

    // rename list existing list
    /**
     * takes a todo list
     * and either one already create from the page
     * which will take place when user is updateing 
     * a todolist title
     * or a todolist that is created before it's added
     * in the case of a brand new todolist
     * 
     * and add an input for entering a name
     */
    function renameList(todoList) {
      //console.log(todoList, '000')
      let titleTextInput = document.createElement('input');
      titleTextInput.type = "text";
      titleTextInput.classList.add("todoList_titleTextInput");

      let isNewTodoList = Boolean(todoList.children[0].children.length == 0);

      if (isNewTodoList) {
        //renaming new todo list
        //console.log(todoList.children[0], '0');
        todoList.children[0].append(titleTextInput);
      } else {
        //renaming existing todo list
        //todo implement later...
        //console.log('rename existing list')
        //console.log(todoList.children[0].children[0], '1');

        todoList.children[0].children[0].replaceWith(titleTextInput);
      }



      return todoList


    }

    /**
     * function takes a particular textInput
     * and put into the correct state and 
     * add the proper event listners for interaction
     */
    function handleTextInputStateChanges(textInputForTodoListItem) {
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

    /**
    * set active list functinality on page start
    */
    let todoList = document.querySelectorAll(".todo-list");
    todoList.forEach((element) => {
      addActiveListEventToList(element);
    });

    // <!-- add functionality to arrow buttons on the todo lists area -->
    let leftTodoListButton = document.querySelector('.left_arrow');
    leftTodoListButton.addEventListener('click', () => {
      shiftList('left');
    });


    let rightTodoListButton = document.querySelector('.right_arrow');
    rightTodoListButton.addEventListener('click', () => {
      shiftList('right');
    });

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          leftTodoListButton.classList.toggle('arrow_key_left');
          shiftList('left');
          setTimeout(() => {
            leftTodoListButton.classList.toggle('arrow_key_left');
          }, 100);
          break;
        case 'ArrowRight':
          //console.log('right?')
          rightTodoListButton.classList.toggle('arrow_key_right');
          shiftList('right');
          setTimeout(() => {
            rightTodoListButton.classList.toggle('arrow_key_right');
          }, 100);
          break
        default:
          break;
      }
    });

    /**
   * currently list in view
   * depends on page starting with the first
   * list element being in view on page start
   * but that isn't the case when user has already shifted
   * the element and then refreshes that page
   * 
   * for now it can't be helped but once the model
   * is created and this data is stored and persitent
   * when page refreshes the listInViewIndex won't reset 
   * to zero it will stay at the correct value.
   * 
   * for testing before creation of data model
   * or persistent data remember to set todolist item 1
   * into view and then refresh page so that data is 
   * aligned with view
   */
    let listInViewIndex = 0;

    /*
    * helper function that updates listInViewIndex
       when user shifts list or adds new list
      or deletes list.
    */
    function updateListInViewIndex(direction, amount) {
      //console.log('ListInViewChange');
      if (direction == 'up') {
        listInViewIndex += amount;
        //console.log(`list in view is at index ${listInViewIndex}`);
        //console.log(listInViewIndex, 'from shift', 'right');
      }

      if (direction == 'down') {
        listInViewIndex -= amount;
        //console.log(listInViewIndex, 'from shift', 'left');
        //console.log(`list in view is at index ${listInViewIndex}`);
      }
    }

    function shiftList(direction) {
      let todo_listsContainer = document.querySelector('#todo-lists');

      let all_todo_list = document.querySelectorAll('.todo-list');

      if (direction == 'left') {
        if (listInViewIndex != 0) {
          updateListInViewIndex('down', 1);
        }

        //console.log(all_todo_list.length,'all')
        //move scroll bar to the left.
        all_todo_list.forEach(element => {
          //console.log(element.scrollLeft);
        });
        todo_listsContainer.scrollLeft -= (Math.round(todo_listsContainer.clientWidth));
      }

      if (direction == 'right') {
        if (listInViewIndex < ((all_todo_list.length) - 1)) {
          updateListInViewIndex('up', 1);
        }

        //move scroll bar to the right.
        todo_listsContainer.scrollLeft += (Math.round(todo_listsContainer.clientWidth));

      }
    }

    /**end of list functionality code */

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

    //updateMoveTodoOptions when switching lists
    function updateMoveTodoOptions() {
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
            updateMoveTodoToList(e);
          });

          //
          element.replaceWith(updatedElement);

        });
      }
    }

    //gets called every time a new list is added or removed
    function updateOptionInPlaceInListFormField(methodOfChange, nameOfList, indexOfListInSavedListsArray) {
      //for form move todo to list
      let placeInList_form = document.getElementById("placeInList_form");

      //for todo move todo to list
      let placeInList_todo = document.querySelectorAll(".placeInList_todo") || '';
      switch (methodOfChange) {
        case 'addOption':
          console.log(methodOfChange);
          console.log(nameOfList, 'name of list being added as an option');
          //add the option of the add list
          //value of option is equal to index in the savedLists array
          let option = document.createElement('option');

          option.classList.add('list-option');
          option.textContent = nameOfList;
          option.value = indexOfListInSavedListsArray;

          //add option to all the todos move selectors
          if (placeInList_todo != '') {
            placeInList_todo.forEach((node) => {
              node.append(option.cloneNode(true));
            });
          }
          placeInList_form.append(option);
          break;
        case 'removeOption':
          /**
           * todo remove option from move todo to list selector.
           * already works some how (not sure how?)
           */
          console.log(methodOfChange, 'method');
          console.log(indexOfListInSavedListsArray, 'indexOfList');
          console.log(nameOfList, 'name of list option to delete');
          //value of the option
          //will be the same as the index of that list in
          // the savedLists array
          let optionToDelete;
          let optionsArray = [];
          let highestValueOption;
          for (let option of placeInList_form) {
            if (option.value == indexOfListInSavedListsArray) {
              console.log(option, 'is option to remove');
              optionToDelete = option
            }
            optionsArray.push(option);
          }

          highestValueOption = optionsArray[optionsArray.length - 1].value;

          //remove option from dom
          optionToDelete.remove();

          //need to update values on the options
          /** 
           * if remove last option/element
           * option values don't shift
           */
          if (indexOfListInSavedListsArray == 0) {
            /**
             *  if remove first option/element
             *  option values shift -1
             */
            for (let option of placeInList_form) {
              option.value -= 1;
            }
            //
            console.log(placeInList_form.children, '0');
          }


          if (indexOfListInSavedListsArray > 0 && indexOfListInSavedListsArray < highestValueOption) {
            /**
             * if option removed's value/index is
             * greater than 0 but less then the
             * highest value option
             */

            optionsArray.forEach((x, index) => {
              /*
               * every index/value after the index/value
               * of the deleted option is shifted back by 1
               * or a shift of -1 for those elements
              */
              if (index > indexOfListInSavedListsArray) {
                x.value -= 1;
              }
            });
            //
          }
          break;
        default:
          break;
      }
    }


    //'add todo' forum view state changes
    /* when day of the week is selected change
    display none to display flex and when another option
    is selected put it back to display none */
    let repeat_options = document.getElementById('repeat_options');
    let dayOfTheWeekSelector = document.querySelector('.dayOfTheWeekSelector');
    let current_option = [...repeat_options.children].find((e) => {
      //console.log(e.selected);
      if (e.selected) {
        return e;
      }
    }).value;

    if (current_option == 'weeks' && !(dayOfTheWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
      dayOfTheWeekSelector.classList.add('show_dayOfTheWeekSelector');
    }

    //console.log(current_option);

    repeat_options.addEventListener('change', (e) => {
      let currently_selected = e.target.value;
      if (currently_selected == 'weeks' && !(dayOfTheWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
        dayOfTheWeekSelector.classList.add('show_dayOfTheWeekSelector');
      } else if (dayOfTheWeekSelector.classList.contains("show_dayOfTheWeekSelector")) {
        dayOfTheWeekSelector.classList.remove("show_dayOfTheWeekSelector");
      }
    });

    /*add todo form when user presses add todo button*/
    let addTodoButton = document.querySelector('.add_Todo');
    let addTodoForm = document.querySelector('.addTodoForm_inactive');

    addTodoButton.addEventListener('click', () => {
      if (addTodoForm.classList.contains('addTodoForm_inactive')) {
        addTodoForm.classList.remove('addTodoForm_inactive');
        addTodoForm.classList.add('addTodoForm_active');
        addTodoButton.classList.add('add_Todo_hide');

        let toggle_repeat = document.getElementsByClassName("toggle_repeat_OFF")[0];
        toggle_repeat.addEventListener('click', (e) => {

          switch (e.target.textContent) {
            case "OFF":
              e.target.textContent = "ON"
              break;
            case "ON":
              e.target.textContent = "OFF"
            default:
              break;
          }

          switch (e.target.classList[0]) {
            case "toggle_repeat_OFF":
              numRepeatElement.disabled = false;
              repeat_options.disabled = false;

              e.target.classList.remove("toggle_repeat_OFF");
              e.target.classList.add("toggle_repeat_ON");
              break;
            case "toggle_repeat_ON":
              e.target.classList.remove("toggle_repeat_ON");
              e.target.classList.add("toggle_repeat_OFF");
              numRepeatElement.disabled = true;
              repeat_options.disabled = true;
            default:
              break;
          }
        });
      }
    });

    let numRepeatElement = document.getElementById('times');
    numRepeatElement.value = "";
    //console.log(repeat_options);

    switch (document.getElementsByClassName("toggle_repeat_OFF")[0].textContent) {
      case "OFF":
        numRepeatElement.disabled = true;
        repeat_options.disabled = true;
        break;
      default:
        break;
    }

    /** start of todos functionality */
    /**
     * adding todo's to the todo list:
     * add events for confirm and cancel button
     * on the add todo form
     */

    // when users clicks confirm
    /**
     * when user presses confirm todo
     * //make sure to validate form data before allowing to confirm //
     * data from form is recieved and used to create a new
     * todo item that is then add to the todo-items list
     */

    //when users clicks cancel
    /**
     * form is hidden and add todo is shown
     * form data should be cleared
     */

    /**confirm and cancel todo events */
    let confirmOrCancelTodoButtons = document.querySelectorAll(".confirmOrCancel_Todo");

    let cancelTodoButton = confirmOrCancelTodoButtons[1];
    cancelTodoButton.addEventListener('click', (e) => {
      //console.log('clicked cancel');
      clearAddTodoFormData();
      /**
       * 
       *hide addTodoForm_active by replacing the class
       *with addTodoForm_inactive 
       *show add todo button by removing the class
       *add_Todo_hide
       *
       * */
      //hide addTodoForm
      addTodoForm.classList.replace("addTodoForm_active", "addTodoForm_inactive");

      //show add todo button
      addTodoButton.classList.remove("add_Todo_hide");

    });

    /**
     * confirm add todo event:
     * use form data to create markup and add classes
     * to create a todo and add it to the todo list
     */
    let confirmTodoButton = confirmOrCancelTodoButtons[0];

    confirmTodoButton.addEventListener('click', (e) => {
      /**
       * call addTodoToList to push a todo to the todo area
       * and save it to a list and pass in
       * buildTodo function to get the todo built
       * and pass get form data func to build todo form
       * so it can build a todo based on the form data   
       */
      addTodoToList(buildTodoWithAddTodoFormData(getAddTodoFormData()));
      clearAddTodoFormData();
    });


    /**
     * builds a todo element based on the form data
     * present when the user pressed confirm
     * and returns the todo 
     */
    function buildTodoWithAddTodoFormData(formData) {
      console.log(formData, 'building a todo');

      let todoListItem = document.createElement('li');
      todoListItem.classList.add("todo-item");

      //buliding mark as complete on todo
      let todoListItemIsComplete = document.createElement('input');
      todoListItemIsComplete.setAttribute('type', 'checkbox');
      todoListItemIsComplete.setAttribute('id', 'markTodoComplete');

      todoListItemIsComplete.addEventListener('change', (e) => {
        //if target checked
        if (e.target.checked) {
          //for now just delete the todo
          // could add feature to move todo to
          // completed todo list later.
          setTimeout(function () { deleteTodoFromList(todoListItem); }, '1000');
        }
      })

      let todoListItemTitle = document.createElement('p');
      todoListItemTitle.classList.add("todo-item_title");
      todoListItemTitle.textContent = "Title: " + formData[0].value;

      let todoListItemDueDate = document.createElement('p');
      todoListItemDueDate.classList.add("todo-item_dueDate");
      todoListItemDueDate.textContent = "Due: " + formData[1].value;

      let todoListItemRepeat = document.createElement('p');
      todoListItemRepeat.classList.add("todo-item_repeat");

      let todoListItemDeleteTodoButton = document.createElement('button');
      todoListItemDeleteTodoButton.textContent = 'delete';
      todoListItemDeleteTodoButton.addEventListener('click', () => {
        deleteTodoFromList(todoListItem);
      });

      //
      let todoListItemExpandButton = document.createElement('button');
      todoListItemExpandButton.textContent = "expand todo";
      todoListItemExpandButton.classList.add("expandTodoButton");
      todoListItemExpandButton.addEventListener('click', (e) => {
        //get todo item element to work on
        let todoItem = e.target.parentElement;

        //visually expand the todo
        todoItem.classList.add('expand-Todo');

        //
        let fields = Array.from(todoItem.children).slice(1, 4);

        let todoTitle = fields[0];
        let todoDueDate = fields[1];
        let todoRepeat = fields[2];

        //editable todo title
        let editableTodoTitleContainer = document.createElement('div');
        editableTodoTitleContainer.classList.add('editableTodoFieldContainer');
        let newTodoTitle = todoTitle.cloneNode(true);
        let renameTodoButton = document.createElement('button');
        renameTodoButton.classList.add('renameTodoButton');
        renameTodoButton.textContent = 'rename title'

        //rename todo
        renameTodoButton.addEventListener('click', (e) => {
          let todoTitleToEdit = e.target.previousSibling;
          let renameInput = document.createElement('input');
          renameInput.type = 'text';
          renameInput.placeholder = 'rename me';

          renameInput.addEventListener("keyup", (e) => {
            if (e.key == "Enter") {
              e.target.blur();
            }
          });

          renameInput.addEventListener('blur', (e) => {
            let input = e.target;
            let newTodoTitleName = input.value;
            let updatedTodoTitle = newTodoTitle.cloneNode(true);
            updatedTodoTitle.textContent = `Title: ${newTodoTitleName}`;
            input.replaceWith(updatedTodoTitle);
          });

          todoTitleToEdit.replaceWith(renameInput)
        });

        //asemble
        editableTodoTitleContainer.append(newTodoTitle);
        editableTodoTitleContainer.append(renameTodoButton);

        //
        todoTitle.replaceWith(editableTodoTitleContainer);

        //editable due date
        /**
         * create editable container 
         * that includes the due date and a change due date button
         * replace current due date with editable version
         * 
         * add event to the chagne date button
         * when clicked
         * replace with an input element
         * of type date ... todo work on later.
         */
        let editableTodoDueDateContainer = document.createElement('div');
        editableTodoDueDateContainer.classList.add('editableTodoFieldContainer');
        let newDueDate = todoDueDate.cloneNode(true);
        let changeDueDateButton = document.createElement('button');
        changeDueDateButton.classList.add('changeDueDateButton');
        changeDueDateButton.textContent = 'change due date'

        //change due date event
        changeDueDateButton.addEventListener('click', (e) => {
          let todoDueDateToEdit = e.target.previousSibling;
          let dueDateInput = document.createElement('input');
          dueDateInput.type = 'date';

          dueDateInput.addEventListener("keyup", (e) => {
            if (e.key == "Enter") {
              e.target.blur();
            }
          });

          dueDateInput.addEventListener('blur', (e) => {
            let input = e.target;
            let newTodoDueDate = input.value;
            let updatedTodoDueDate = newTodoTitle.cloneNode(true);
            updatedTodoDueDate.textContent = 'Due: ' + newTodoDueDate;
            input.replaceWith(updatedTodoDueDate);
          });

          todoDueDateToEdit.replaceWith(dueDateInput);
        });

        //
        editableTodoDueDateContainer.append(newDueDate);
        editableTodoDueDateContainer.append(changeDueDateButton);

        //
        todoDueDate.replaceWith(editableTodoDueDateContainer);

        //editable repeat
        let editableTodoRepeatContainer = document.createElement('div');
        editableTodoRepeatContainer.classList.add('editableTodoFieldContainer');
        editableTodoRepeatContainer.classList.add('editableTodoFieldContainer_repeat')
        let newRepeat = todoRepeat.cloneNode(true);
        let editRepeatButton = document.createElement('button');
        editRepeatButton.classList.add('editRepeatButton');
        editRepeatButton.textContent = 'edit repeat';

        //start of edit repeat event
        editRepeatButton.addEventListener('click', (e) => {
          let todoRepeatToEdit = e.target.previousSibling;
          let repeatFormField = document.querySelector('.repeat_option_sub_container').cloneNode(true);
          let onOffToggleButton = document.querySelector('#toggleRepeat').cloneNode(true);

          onOffToggleButton.addEventListener('click', (e) => {
            /**
             * if day of the week selector is open
             * due to option being set to weeks then 
             * close when toggling to off by setting the option
             * back to days before disableing.
             */
            switch (e.target.textContent) {
              case "OFF":
                e.target.textContent = "ON"
                break;
              case "ON":
                e.target.textContent = "OFF"
              default:
                break;
            }

            let numRepeatElement = e.target.previousElementSibling.previousElementSibling;
            let repeat_options = numRepeatElement.nextElementSibling;

            switch (e.target.classList[0]) {
              case "toggle_repeat_OFF":
                numRepeatElement.disabled = false;
                repeat_options.disabled = false;

                e.target.classList.remove("toggle_repeat_OFF");
                e.target.classList.add("toggle_repeat_ON");
                break;
              case "toggle_repeat_ON":
                e.target.classList.remove("toggle_repeat_ON");
                e.target.classList.add("toggle_repeat_OFF");
                numRepeatElement.disabled = true;
                repeat_options.disabled = true;
              default:
                break;
            }
          });

          repeatFormField.append(onOffToggleButton);


          /**
           * updated view for select element 
           */
          let repeat_select_options = repeatFormField.children[2];
          let todo_dayOfWeekSelector = document.querySelector('.dayOfTheWeekSelector').cloneNode(true);


          repeatFormField.append(todo_dayOfWeekSelector);

          repeat_select_options.addEventListener('change', (e) => {
            let currently_selected = e.target.value;
            if (currently_selected == 'weeks' && !(todo_dayOfWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
              todo_dayOfWeekSelector.classList.add('show_dayOfTheWeekSelector');
            } else if (todo_dayOfWeekSelector.classList.contains("show_dayOfTheWeekSelector")) {
              todo_dayOfWeekSelector.classList.remove("show_dayOfTheWeekSelector");
            }
          });

          let confirmChangeButton = document.createElement('button');
          confirmChangeButton.textContent = 'ok';

          confirmChangeButton.addEventListener('click', (e) => {
            let frequencyOfRepeat = repeat_select_options.previousElementSibling.value;
            let typeOfFrequency = repeat_select_options.value;

            let daysArray = Array.from(todo_dayOfWeekSelector.children);
            console.log(daysArray, 'daysArray');

            //hold new repeat textcontent
            let repeatTextContent;
            if (onOffToggleButton.textContent == "ON" && frequencyOfRepeat > 0) {
              console.log('check')
              switch (typeOfFrequency) {
                case 'days':
                  if (frequencyOfRepeat == 1) {
                    console.log('check0')
                    repeatTextContent = `Repeat: daily`;
                  } else {
                    repeatTextContent = `Repeat: every ${frequencyOfRepeat} days`;
                  }
                  break;
                case 'weeks':
                  //boolean values for the days of the week checkboxes
                  // to be used in conditional for forming the repeat phrase
                  let isSunChecked;
                  let isMonChecked;
                  let isTueChecked;
                  let isWedChecked;
                  let isThuChecked;
                  let isFriChecked;
                  let isSatChecked;

                  //used to store the days checked if any
                  let daysChecked = [];

                  console.log(daysArray,'daysArray');

                  //check which checkBox are set to on
                  daysArray.forEach((day, index, array) => {
                    //used to see what days are checked
                    switch (index) {
                      case 0:
                        //check if sun is checked
                        isSunChecked = array[index].children[0].control.checked
                        break;
                      case 1:
                        //check if mon is checked
                        isMonChecked = array[index].children[0].control.checked
                        break;
                      case 2:
                        //check if tue is checked
                        isTueChecked = array[index].children[0].control.checked
                        break;
                      case 3:
                        //check if wed is checked
                        isWedChecked = array[index].children[0].control.checked
                        break;
                      case 4:
                        //check if thu is checked
                        isThuChecked = array[index].children[0].control.checked
                        break;
                      case 5:
                        //check if fri is checked
                        isFriChecked = array[index].children[0].control.checked
                        break;
                      case 6:
                        //check if sat is checked
                        isSatChecked = array[index].children[0].control.checked
                        break;
                      default:
                        break;
                    }
                  });

                  //add the specific days to the
                  //dayschecked array
                  if (isSunChecked) {
                    daysChecked.push('sun');
                  }

                  if (isMonChecked) {
                    daysChecked.push('mon');
                  }

                  if (isTueChecked) {
                    daysChecked.push('tue');
                  }

                  if (isWedChecked) {
                    daysChecked.push('wed');
                  }

                  if (isThuChecked) {
                    daysChecked.push('thu');
                  }

                  if (isFriChecked) {
                    daysChecked.push('fri');
                  }

                  if (isSatChecked) {
                    daysChecked.push('sat');
                  }

                  console.log('daysCheckedArray',daysChecked);

                  //set to true if all days are checked
                  let isAllDaysChecked = Boolean(
                    isSunChecked &&
                    isMonChecked &&
                    isTueChecked &&
                    isWedChecked &&
                    isThuChecked &&
                    isFriChecked &&
                    isSatChecked
                  );
                  console.log('isAllDaysChecked',isAllDaysChecked);

                  //set to true if at least one day is checked
                  let isAnyDayCheck = Boolean(
                    isSunChecked ||
                    isMonChecked ||
                    isTueChecked ||
                    isWedChecked ||
                    isThuChecked ||
                    isFriChecked ||
                    isSatChecked
                  );
                  console.log('isAnyDaysCheck', isAnyDayCheck);

                  let isWeekDaysOnlyChecked = Boolean(
                    !(isSatChecked && isSunChecked) &&
                    (isMonChecked &&
                    isTueChecked &&
                    isWedChecked &&
                    isThuChecked &&
                    isFriChecked)
                  );
                  console.log('isWeekDaysOnlyChecked',isWeekDaysOnlyChecked);

                  let isWeekendOnlyChecked = Boolean(
                    !(
                      isMonChecked ||
                      isTueChecked ||
                      isWedChecked ||
                      isThuChecked ||
                      isFriChecked
                    ) &&
                    (isSunChecked &&
                    isSatChecked)
                  );
                  console.log('isWeekendOnlyChecked',isWeekendOnlyChecked);

                  //form the days checked into a phrase
                  let daysCheckedPhrase = '';
                  if (daysChecked.length == 1) {
                    daysCheckedPhrase = `${daysChecked[0]}`;
                  } else if (daysChecked.length == 2) {
                    daysCheckedPhrase = daysChecked.join(' and ');
                  } else if (daysChecked.length > 2 && !(isAllDaysChecked)) {
                    daysCheckedPhrase = daysChecked.slice(0, -1).join(',') + ` and ${daysChecked[daysChecked.length - 1]} `;
                  }

                  //
                  if (isWeekDaysOnlyChecked) {
                    console.log('in here?')
                    daysCheckedPhrase = "weekdays";
                  }

                  if (isWeekendOnlyChecked) {
                    daysCheckedPhrase = "weekends";
                  }

                  //plural and singular 
                  if (frequencyOfRepeat == 1) {
                    console.log('singular');
                    //singular
                    if (isAllDaysChecked) {
                      repeatTextContent = "Repeat: weekly";
                    } else if (isAnyDayCheck) {
                      /**
                      * if any configuration of the checkboxes are set
                      * to on sentence structure should be the following
                      * Repeat: weekly on (days selected) 
                      * example: sun and sat
                      * Repeat: weekly on sun and sat/ sun, sat, mon and tue
                      */
                      repeatTextContent = `Repeat: Weekly on ${daysCheckedPhrase} `;
                    }
                  }

                  if (frequencyOfRepeat > 1) {
                    //plural
                    if (isAllDaysChecked) {
                      repeatTextContent = `Repeat: every ${frequencyOfRepeat} weeks`;
                    } else if (isAnyDayCheck) {
                      /** 
                       * if any configuration of the checkboxes are set
                       * to on sentence structure should be the following
                       * if numtimes > 1
                       * Repeat: every numtimes weeks on sat/ sun, sat, mon and tue
                       */
                      repeatTextContent = `Repeat: every ${frequencyOfRepeat} weeks on ${daysCheckedPhrase}`;
                    }
                  }
                  break;
                case 'months':
                  //plural singular
                  if (frequencyOfRepeat == 1) {
                    //singular
                    repeatTextContent = 'Repeat: monthly';
                  } else if (frequencyOfRepeat > 1) {
                    //plural
                    repeatTextContent = `Repeat: every ${frequencyOfRepeat} months`;
                  }
                  break;
                case 'years':
                  //plural singular
                  if (frequencyOfRepeat == 1) {
                    //singular
                    repeatTextContent = 'Repeat: yearly';
                  } else if (frequencyOfRepeat > 1) {
                    //plural
                    repeatTextContent = `Repeat: every ${frequencyOfRepeat} years`;
                  }
                  break;
                default:
                  break;
              }

            } else {
              //user did not select repeat
              repeatTextContent = 'repeat: off'
            }

            console.log(repeatTextContent,'phrase it');

            let repeatElement = document.createElement('p');
            repeatElement.textContent = repeatTextContent;
            repeatElement.classList.add('todo-item_repeat');
            repeatFormField.replaceWith(repeatElement);
            confirmChangeButton.remove();
            cancelButton.remove();
            editableTodoRepeatContainer.append(editRepeatButton);
          });

          let cancelButton = document.createElement('button');
          cancelButton.textContent = 'cancel';

          cancelButton.addEventListener('click', (e) => {
            console.log(e, 'cancel');
            /**
             * make sure to save a copy of what was set before
             * edit was selected and put back the saved copy
             * on cancel
             * 
             * todo make saved copy
             */
            repeatFormField.replaceWith(todoRepeatToEdit);
            confirmChangeButton.remove();
            cancelButton.remove();
            editableTodoRepeatContainer.append(editRepeatButton);
          });

          editableTodoRepeatContainer.append(confirmChangeButton);
          editableTodoRepeatContainer.append(cancelButton);

          e.target.remove();
          console.log(todoRepeatToEdit, '?');
          todoRepeatToEdit.replaceWith(repeatFormField);
        });
        //end of edit repeat event

        editableTodoRepeatContainer.append(newRepeat);
        editableTodoRepeatContainer.append(editRepeatButton);

        todoRepeat.replaceWith(editableTodoRepeatContainer);

        /**
         * notes feature:
         * add a notes text box with scroll
         * a save button for the notes or save on change
         * 
         * for now add notes to a global array or
         * wait until model is built and save to object instead
         * 
         * wait on notes features and focus on making fields
         * editable when expanded.
         * 
         * after this feature working building the model
         * and controller and fragmenting this file into
         * components.
         */

        // replace expand button but save it for later
        let expandTodoButton = e.target;
        let collapseTodoButon = e.target.cloneNode(true);
        collapseTodoButon.textContent = 'collapse and save todo';
        expandTodoButton.replaceWith(collapseTodoButon);
        
        //collapse todo
        collapseTodoButon.addEventListener('click',(e)=>{
          //
          todoItem.classList.remove('expand-Todo');

          let newTitle = document.createElement('p'); 
          let dueDate = document.createElement('p');
          let newerRepeat = document.createElement('p');
          
          newTitle.classList.add('todo-item_title');
          dueDate.classList.add('todo-item_dueDate');
          newerRepeat.classList.add('todo-item_repeat');
          
          newTitle.textContent = `${editableTodoTitleContainer.children[0].textContent}`;
          dueDate.textContent =  `${editableTodoDueDateContainer.children[0].textContent}`;
          newerRepeat.textContent = `${editableTodoRepeatContainer.children[0].textContent}`;
          
          editableTodoTitleContainer.replaceWith(newTitle);
          editableTodoDueDateContainer.replaceWith(dueDate);
          editableTodoRepeatContainer.replaceWith(newerRepeat);
          
          /**
           * replace collapse and save with expand
           */
          collapseTodoButon.replaceWith(expandTodoButton);
        });
        
        
      });


      console.log(formData[5], 'repeat');
      //code for handling the repeat option text
      if (formData[6].textContent == "ON" && formData[3].value > 0) {
        //console.log('repeat on', formData[5].textContent);
        //console.log('is num times', formData[2]);
        //console.log('is repeat options', formData[3]);

        switch (formData[4].value) {
          case 'days':
            if (formData[3].value == 1) {
              todoListItemRepeat.textContent = `Repeat: daily`;
            } else {
              //console.log(formData[2], 'datacheck');
              todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} days`;
            }
            break;
          case 'weeks':
            //boolean values for the days of the week checkboxes
            // to be used in conditional for forming the repeat phrase
            let isSunChecked;
            let isMonChecked;
            let isTueChecked;
            let isWedChecked;
            let isThuChecked;
            let isFriChecked;
            let isSatChecked;

            //used to store the days checked if any
            let daysChecked = [];

            //check which checkBox are set to on
            formData[5].forEach((day, index, array) => {
              //used to see what days are checked
              switch (index) {
                case 0:
                  //check if sun is checked
                  isSunChecked = array[index].checked

                  break;
                case 1:
                  //check if mon is checked
                  isMonChecked = array[index].checked
                  break;
                case 2:
                  //check if tue is checked
                  isTueChecked = array[index].checked
                  break;
                case 3:
                  //check if wed is checked
                  isWedChecked = array[index].checked
                  break;
                case 4:
                  //check if thu is checked
                  isThuChecked = array[index].checked
                  break;
                case 5:
                  //check if fri is checked
                  isFriChecked = array[index].checked
                  break;
                case 6:
                  //check if sat is checked
                  isSatChecked = array[index].checked
                  break;
                default:
                  break;
              }
            });

            //add the specific days to the
            //dayschecked array
            if (isSunChecked) {
              daysChecked.push('sun');
            }

            if (isMonChecked) {
              daysChecked.push('mon');
            }

            if (isTueChecked) {
              daysChecked.push('tue');
            }

            if (isWedChecked) {
              daysChecked.push('wed');
            }

            if (isThuChecked) {
              daysChecked.push('thu');
            }

            if (isFriChecked) {
              daysChecked.push('fri');
            }

            if (isSatChecked) {
              daysChecked.push('sat');
            }

            //set to true if all days are checked
            let isAllDaysChecked = Boolean(
              isSunChecked &&
              isMonChecked &&
              isTueChecked &&
              isWedChecked &&
              isThuChecked &&
              isFriChecked &&
              isSatChecked
            );

            //set to true if at least one day is checked
            let isAnyDayCheck = Boolean(
              isSunChecked ||
              isMonChecked ||
              isTueChecked ||
              isWedChecked ||
              isThuChecked ||
              isFriChecked ||
              isSatChecked
            );

            let isWeekDaysOnlyChecked = Boolean(
              !(isSatChecked && isSunChecked) &&
              (isMonChecked &&
              isTueChecked &&
              isWedChecked &&
              isThuChecked &&
              isFriChecked)
            );

            let isWeekendOnlyChecked = Boolean(
              !(
                isMonChecked ||
                isTueChecked ||
                isWedChecked ||
                isThuChecked ||
                isFriChecked
              ) &&
              (isSunChecked &&
              isSatChecked)
            );

            //form the days checked into a phrase
            let daysCheckedPhrase = '';
            if (daysChecked.length == 1) {
              daysCheckedPhrase = `${daysChecked[0]}`;
            } else if (daysChecked.length == 2) {
              daysCheckedPhrase = daysChecked.join(' and ');
            } else if (daysChecked.length > 2 && !(isAllDaysChecked)) {
              daysCheckedPhrase = daysChecked.slice(0, -1).join(',') + ` and ${daysChecked[daysChecked.length - 1]} `;
            }

            //
            if (isWeekDaysOnlyChecked) {
              daysCheckedPhrase = "weekdays";
            }

            //
            if (isWeekendOnlyChecked) {
              daysCheckedPhrase = "weekends";
            }

            //plural and singular 
            if (formData[3].value == 1) {
              console.log(formData[3].value,'singular');
              //singular
              if (isAllDaysChecked) {
                todoListItemRepeat.textContent = "Repeat: weekly";
              } else if (isAnyDayCheck) {
                /**
                * if any configuration of the checkboxes are set
                * to on sentence structure should be the following
                * Repeat: weekly on (days selected) 
                * example: sun and sat
                * Repeat: weekly on sun and sat/ sun, sat, mon and tue
                */
                todoListItemRepeat.textContent = `Repeat: Weekly on ${daysCheckedPhrase} `;
              }
            }

            if (formData[3].value > 1) {
              //plural
              if (isAllDaysChecked) {
                todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} weeks`;
              } else if (isAnyDayCheck) {
                /** 
                 * if any configuration of the checkboxes are set
                 * to on sentence structure should be the following
                 * if numtimes > 1
                 * Repeat: every numtimes weeks on sat/ sun, sat, mon and tue
                 */
                todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} weeks on ${daysCheckedPhrase}`;
              }
            }
            break;
          case 'months':
            //plural singular
            if (formData[3].value == 1) {
              //singular
              todoListItemRepeat.textContent = 'Repeat: monthly';
            } else if (formData[3].value > 1) {
              //plural
              todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} months`;
            }
            break;
          case 'years':
            //plural singular
            if (formData[3].value == 1) {
              //singular
              todoListItemRepeat.textContent = 'Repeat: yearly';
            } else if (formData[3].value > 1) {
              //plural
              todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} years`;
            }
            break;
          default:
            break;
        }

      } else {
        //user did not select repeat
        todoListItemRepeat.textContent = 'repeat: off'
      }

      console.log(todoListItemRepeat.textContent,'check value');

      let placeInList = document.getElementById('placeInList_form');
      console.log(placeInList, 'placeInList');
      let moveTodoToList = placeInList.cloneNode(true);
      //update id/class and name
      moveTodoToList.id = "placeInList_todo";
      moveTodoToList.name = "placeInList_todo";
      moveTodoToList.classList.add('placeInList_todo');

      //set value or option that will be shown
      moveTodoToList.value = placeInList.value;

      //add event listner
      moveTodoToList.addEventListener('change', (e) => {
        updateMoveTodoToList(e);
      });

      //asemble todo 
      todoListItem.append(todoListItemIsComplete)
      todoListItem.append(todoListItemTitle);
      todoListItem.append(todoListItemDueDate);
      todoListItem.append(todoListItemRepeat);
      todoListItem.append(moveTodoToList);
      todoListItem.append(todoListItemDeleteTodoButton);
      todoListItem.append(todoListItemExpandButton);

      return [todoListItem, formData[2]];
    }

    /**
     * add a todo to the todo area
     * and saves it to the active list by default
     */
    function addTodoToList(todoAndListData) {
      let todo = todoAndListData[0];
      let list = todoAndListData[1];
      console.log(list.value, 'list index')
      /**
      save todo to list if none specified default is active list
      but if specified in the place in list option then move to that
      list.
       */
      saveTodoToSavedListsArray(todo, list.value);

      if (savedLists[list.value][0].classList.contains("todo-list_activeList")) {
        document.getElementsByClassName("todo-items")[0].prepend(todo);
      }
    }

    /**
     * takes a todo and saves it to the index of list in
     * the savedLists array specified.
     * if list paramater is not specified the list defaults
     * to the index of the active list
     */
    function saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = indexOfactiveListInSaveLists) {
      savedLists[indexOfListToSaveTo][1].push(todoToSave);
    }

    /**
     * deletes todo from savedLists array
     * and removes it from the DOM
    */
    function deleteTodoFromList(todo) {
      //delete todo from savedLists array
      deleteTodoFromSavedListsArray(todo);

      console.log(todo, 'todo')
      //remove from DOM
      todo.remove();

    }

    function deleteTodoFromSavedListsArray(todoToDelete, indexOfListToDeleteFrom = indexOfactiveListInSaveLists) {
      //delete todo from active list
      let placementOfTodoToDelete;
      //find the placement of the todo to delete in the savedLists
      savedLists[indexOfListToDeleteFrom][1].forEach((x, index) => {
        if (x == todoToDelete) {
          placementOfTodoToDelete = index
        }
      });
      savedLists[indexOfListToDeleteFrom][1].splice(placementOfTodoToDelete, 1);
    }

    function clearAddTodoFormData() {
      /**
       * call setformdata function passing in
       * 2 arguments first is the function getAddTodoFormData
       * getFormData returns all of the formData
       * from the addTodoForm
       * the second argument is 'clearFrom' which tells 
       * setAddTodoFormData to just set the form data passed in
       * to nothing clearing the form.
       */
      setAddTodoFormData(getAddTodoFormData(), 'clearForm');
    }

    function getAddTodoFormData() {
      let todoTitleInputValue = addTodoForm[0]
      let todoDueDateInputValue = addTodoForm[1]
      let placeInList_form = addTodoForm[2].selectedOptions[0];
      let todoNumTimesRepeat = addTodoForm[3];
      let todoRepeatOption = addTodoForm[4];

      let todoSunOptionWeeklyRepeat = addTodoForm[5];
      let todoMonOptionWeeklyRepeat = addTodoForm[6];
      let todoTueOptionWeeklyRepeat = addTodoForm[7];
      let todoWedOptionWeeklyRepeat = addTodoForm[8];
      let todoThuOptionWeeklyRepeat = addTodoForm[9];
      let todoFriOptionWeeklyRepeat = addTodoForm[10];
      let todoSatOptionWeeklyRepeat = addTodoForm[11];

      let todoWeeklyRepeatOptions = [
        todoSunOptionWeeklyRepeat,
        todoMonOptionWeeklyRepeat,
        todoTueOptionWeeklyRepeat,
        todoWedOptionWeeklyRepeat,
        todoThuOptionWeeklyRepeat,
        todoFriOptionWeeklyRepeat,
        todoSatOptionWeeklyRepeat
      ];

      let todoRepeatOnOrOffData = document.getElementById("toggleRepeat");

      let formData = [
        todoTitleInputValue,
        todoDueDateInputValue,
        placeInList_form,
        todoNumTimesRepeat,
        todoRepeatOption,
        todoWeeklyRepeatOptions,
        todoRepeatOnOrOffData
      ];



      return formData
    }

    function setAddTodoFormData(formData, action) {
      //console.log(formData, 'set');
      let todoTitleInputValue = formData[0];
      let todoDueDateInputValue = formData[1];
      let todoPlaceInListValue = formData[2]
      let todoNumTimesRepeat = formData[3];
      let todoRepeatOption = formData[4];
      let todoWeeklyRepeatOptions = formData[5];
      let todoRepeatOnOrOffData = formData[6];


      if (action == 'clearForm') {
        //clear form data
        console.log(formData);

        //clear title input field
        todoTitleInputValue.value = "";

        //clear due date input field
        todoDueDateInputValue.value = "";

        //clear num times repeat
        todoNumTimesRepeat.value = "";

        //set repeat options back to default(days)
        todoRepeatOption.value = "days";

        //loop over all of the weekly repeat options and
        //uncheck them
        todoWeeklyRepeatOptions.forEach((option) => {
          option.checked = false;
        });

        //hide the dayOfTheWeekSelector
        dayOfTheWeekSelector.classList.remove("show_dayOfTheWeekSelector");

        //turn off the repeat option
        todoRepeatOnOrOffData.classList.remove("toggle_repeat_ON");
        todoRepeatOnOrOffData.classList.add("toggle_repeat_OFF");
        todoRepeatOnOrOffData.textContent = "OFF";

        todoNumTimesRepeat.disabled = true;
        //disable the repeat options
        todoRepeatOption.disabled = true;
      }
    }

    function updateMoveTodoToList(e) {
      //save todo to new list
      //saveTodoToSavedListsArray(todoToSave, indexOfListToSaveTo = indexOfactiveListInSaveLists)
      saveTodoToSavedListsArray(e.target.parentElement, e.target.value)

      //remove todo from dom and saveLists
      deleteTodoFromList(e.target.parentElement);
    }

  });
}