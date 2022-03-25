   export{renameList};

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