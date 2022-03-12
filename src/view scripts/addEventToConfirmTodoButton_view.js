export { addEventToConfirmTodoButton };
import {addTodoToList} from './addTodoToList_view.js';
import {buildTodoWithAddTodoFormData} from './buildTodoWithAddTodoFormData_view.js';
import{getAddTodoFormData} from './getAddTodoFormData_view.js';
import {clearAddTodoFormData} from './clearAddTodoFormData_view.js';

function addEventToConfirmTodoButton(confirmOrCancelTodoButtons,addTodoForm,dayOfTheWeekSelector) {
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
        addTodoToList(buildTodoWithAddTodoFormData(getAddTodoFormData(addTodoForm)));
        clearAddTodoFormData(addTodoForm,dayOfTheWeekSelector);
    });
}