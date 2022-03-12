export { clearAddTodoFormData };
import {setAddTodoFormData} from './setAddTodoFormData_view.js'
import {getAddTodoFormData} from './getAddTodoFormData_view.js';

function clearAddTodoFormData(addTodoForm,dayOfTheWeekSelector) {
    /**
     * call setformdata function passing in
     * 2 arguments first is the function getAddTodoFormData
     * getFormData returns all of the formData
     * from the addTodoForm
     * the second argument is 'clearFrom' which tells 
     * setAddTodoFormData to just set the form data passed in
     * to nothing clearing the form.
     */
    setAddTodoFormData(getAddTodoFormData(addTodoForm), 'clearForm',dayOfTheWeekSelector);
}