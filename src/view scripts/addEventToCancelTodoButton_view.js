export { addEventToCancelTodoButton };
import {clearAddTodoFormData} from './clearAddTodoFormData_view.js';

function addEventToCancelTodoButton(confirmOrCancelTodoButtons,addTodoForm,dayOfTheWeekSelector,addTodoButton) {
    let cancelTodoButton = confirmOrCancelTodoButtons[1];
    cancelTodoButton.addEventListener('click', (e) => {
        //console.log('clicked cancel');
        clearAddTodoFormData(addTodoForm,dayOfTheWeekSelector,addTodoButton);
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
}