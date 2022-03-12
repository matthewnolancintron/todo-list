export{setAddTodoFormData};

function setAddTodoFormData(formData, action,dayOfTheWeekSelector) {
    //console.log(formData, 'set');
    let todoTitleInputValue = formData[0];
    let todoDueDateInputValue = formData[1];
    let todoPlaceInListValue = formData[2]
    let todoNumTimesRepeat = formData[3];
    let todoRepeatOption = formData[4];
    let todoWeeklyRepeatOptions = formData[5];
    let todoRepeatOnOrOffData = formData[6];


    if (action == 'clearForm') {
        //clear form data
        console.log(formData);

        //clear title input field
        todoTitleInputValue.value = "";

        //clear due date input field
        todoDueDateInputValue.value = "";

        //clear num times repeat
        todoNumTimesRepeat.value = "";

        //set repeat options back to default(days)
        todoRepeatOption.value = "days";

        //loop over all of the weekly repeat options and
        //uncheck them
        todoWeeklyRepeatOptions.forEach((option) => {
            option.checked = false;
        });

        //hide the dayOfTheWeekSelector
        dayOfTheWeekSelector.classList.remove("show_dayOfTheWeekSelector");

        //turn off the repeat option
        todoRepeatOnOrOffData.classList.remove("toggle_repeat_ON");
        todoRepeatOnOrOffData.classList.add("toggle_repeat_OFF");
        todoRepeatOnOrOffData.textContent = "OFF";

        todoNumTimesRepeat.disabled = true;
        //disable the repeat options
        todoRepeatOption.disabled = true;
    }
}