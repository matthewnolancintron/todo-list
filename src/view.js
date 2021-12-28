 /**
  * View:
  * -----
  * user interface should be able to
 *  view all projects/lists,
 *  view all todos in each project
 *  just title duedate could change color for different
 *  priorities,
 *  expand single todo to see/edit details,
    delete todo.

    when user first opens the app there should
    be default project or todo list
    where all todos are put.

    build view all in this file
    then split into modules.
*/



/**
 * default list
 * calls makeTodoList
 */

/**
 * https://www.google.com/search?q=allow+user+to+rename+element+css&client=ubuntu&hs=gdS&channel=fs&ei=nYPEYZDpO4vL_QbD0riICA&ved=0ahUKEwjQq8WKjfr0AhWLZd8KHUMpDoEQ4dUDCA0&uact=5&oq=allow+user+to+rename+element+css&gs_lcp=Cgdnd3Mtd2l6EAMyBQghEKABMgUIIRCrAjoHCAAQRxCwAzoFCAAQkQI6DgguEIAEELEDEMcBENEDOhEILhCABBCxAxCDARDHARDRAzoECAAQQzoLCC4QgAQQxwEQ0QM6CAgAEIAEELEDOgUIABCABDoICC4QgAQQsQM6CwguEIAEEMcBEKMCOhQIABDqAhC0AhCKAxC3AxDUAxDlAjoLCAAQgAQQsQMQgwE6CAguELEDEIMBOg4ILhCABBCxAxDHARCjAjoLCC4QgAQQsQMQgwE6BwgAELEDEEM6BQguEIAEOggIIRAWEB0QHjoGCAAQFhAeSgQIQRgASgQIRhgAUOoFWMI1YOw2aAJwAngAgAF6iAH9EpIBBDI5LjSYAQCgAQGwAQrIAQjAAQE&sclient=gws-wiz
 * html:
 * 
 * 
 */
export{View};

function View() {
    document.addEventListener('DOMContentLoaded', ()=>{
        console.log('ready');
        let listOptions = document.querySelector('.list-options');
        listOptions.addEventListener('click',()=>{
        document.getElementById("myDropdown").classList.toggle("show");
    });


    // Close the dropdown menu if the user clicks outside of it
    document.body.onclick = function(event) {
      if (!event.target.matches('.list-options')) {
        if(document.getElementById("myDropdown").classList.contains('show')){
          document.getElementById("myDropdown").classList.remove('show');
        }
      }
    }

    // <!-- add functionality to arrow buttons on the todo lists area -->
    let leftTodoListButton = document.querySelector('.left_arrow');
    leftTodoListButton.addEventListener('click', ()=>{
        shiftList('left');
    });


    let rightTodoListButton = document.querySelector('.right_arrow');
    rightTodoListButton.addEventListener('click', ()=>{
        shiftList('right');
    });

    document.addEventListener('keydown', (e)=>{
      switch (e.key) {
        case 'ArrowLeft':
          leftTodoListButton.classList.toggle('arrow_key_left');
          shiftList('left');
          setTimeout(()=>{
            leftTodoListButton.classList.toggle('arrow_key_left'); 
          },100);
          break;
        case 'ArrowRight':
          console.log('right?')
          rightTodoListButton.classList.toggle('arrow_key_right');
          shiftList('right');
          setTimeout(()=>{
            rightTodoListButton.classList.toggle('arrow_key_right');
          },100);
          break
        default:
          break;
      }
    });

    function shiftList(direction){
      //console.log(direction);
      let todo_listsContainer = document.querySelector('#todo-lists');
      //console.log(todo_listsContainer.scrollLeft);
      let all_todo_list = document.querySelectorAll('.todo-list');
      //console.log(all_todo_list);
      //console.log(todo_listsContainer.scrollLeft);  
      if(direction == 'left'){
        //move scroll bar to the left.
        all_todo_list.forEach(element => {
          console.log(element.scrollLeft);
        });
        todo_listsContainer.scrollLeft -= (Math.round(todo_listsContainer.clientWidth));
      }
      
      if(direction == 'right'){
        //move scroll bar to the right.
        todo_listsContainer.scrollLeft += (Math.round(todo_listsContainer.clientWidth));
      }



        //start here...what todo next?
        //check git
    }
    // <!-- add functionality to todo list options -->



    });
    
}