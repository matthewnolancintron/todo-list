    export {updateTodosInTodoArea};
  import { updateUserFireStoreData } from '../updateUserFireStoreData.js';
    import {decodeTodoObjectIntoTodoElement} from './decodeTodoObjectIntoTodoElement_view.js'

      /**
       * needs to recive savedLists as an argument
       * set savedLists as a parameter
     */

    //updates the todo area when the active list is changed
    async function updateTodosInTodoArea() {
        let todoItems = document.getElementsByClassName("todo-items")[0].children;
        let todoItemList = document.getElementsByClassName("todo-items")[0];
        let todoItemsAtStartLength = todoItems.length;
        console.log(todoItems,'todoItems');
        console.log(todoItemList,'todoItemList');
        console.log(todoItemsAtStartLength,'todoItemsAtStartLength');
  
        //clear todo's
        /**
         * clear todos from todo area in the todo list
         */
        for (let i = todoItemsAtStartLength; i--;) {
          todoItems.item(i).remove()
        }
  
        /**
         * @
         * add todos back to the todo area in the todo list
         * by adding todos that were saved to the active list
         * in the savedLists array
         */
        let savedLists = await updateUserFireStoreData('list','retriveListData');
        savedLists.forEach((x) => {
          if (document.getElementById(x['todoListData'].uuid).classList.contains("todo-list_activeList")) {
            x['todoItemsData'].forEach((y) => {
              //decode todo ObjectData and append to todo area
              todoItemList.append(decodeTodoObjectIntoTodoElement(y));
            });
          }
        });

        //localStorage.setItem('savedLists',JSON.stringify(savedLists));
        /**
         * todo isn't in dom or savedList only it's uuid data atrribute was saved the todo
         * is created and then kinda lost since it hasen't been saved to anything outside the
         * context it was created.
         * 
         * need to find place to save it to
         * save to dom somewhere but hide it?
         * 
         * option 1:
         * add them to the list/todo area but add propertie of hidden?
         * when adding a todo 
         * when updatating todo area just remove that propertie
         * also need to update clearing functionality to just add propertie to hide all todos
         * basically updating todo area will become a game of hide and seek
         * or
         * hide all todo's and then only unhide/show all todo that belong to the new active list.
         * 
         * option 2
         * is to create and object/string thing to local storage instead of the uuid
         * it props will be created from the componets of the todo it will be an object
         * of props whos values represnets the parts of the todo element
         * it will be turned into a string when stored in local storage when retrieved from
         * local storage need to be converted back to an object that object will act as the 
         * instructions for rebuilding the todo each props is used for dynamically building the todo
         * the object is the dna of the todo dom element.
         * need two helper functions
         * -encode dynamically created dom element into object
         * -decode object/blueprint into dom element.
         * 
         * going to work on option 2
         * option 1 is like shoving a mess under a bed cluttering up the dom 
         * the bed is the dom I guess...
         */
      }