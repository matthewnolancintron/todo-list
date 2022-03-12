   export{setTodoListTitle};
   
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