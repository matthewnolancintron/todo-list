export{addEventToAddTodoButton};

function addEventToAddTodoButton(addTodoButton,addTodoForm,numRepeatElement) {
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
}