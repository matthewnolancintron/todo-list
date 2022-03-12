    export {updateTodosInTodoArea};

      /**
       * needs to recive savedLists as an argument
       * set savedLists as a parameter
     */

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
        let savedLists = JSON.parse(localStorage.getItem('savedLists'));
        savedLists.forEach((x) => {
          if (x[0].classList.contains("todo-list_activeList")) {
            x[1].forEach((y) => {
              todoItemList.append(y);
            });
          }
        });

        localStorage.setItem('savedLists',JSON.stringify(savedLists));
      }