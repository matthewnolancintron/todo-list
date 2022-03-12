    export{getTodoListTitle};

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