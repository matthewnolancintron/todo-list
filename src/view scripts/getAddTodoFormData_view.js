export { getAddTodoFormData };

function getAddTodoFormData(addTodoForm) {
    let todoTitleInputValue = addTodoForm[0]
    let todoDueDateInputValue = addTodoForm[1]
    let placeInList_form = addTodoForm[2].selectedOptions[0];
    let todoNumTimesRepeat = addTodoForm[3];
    let todoRepeatOption = addTodoForm[4];

    let todoSunOptionWeeklyRepeat = addTodoForm[5];
    let todoMonOptionWeeklyRepeat = addTodoForm[6];
    let todoTueOptionWeeklyRepeat = addTodoForm[7];
    let todoWedOptionWeeklyRepeat = addTodoForm[8];
    let todoThuOptionWeeklyRepeat = addTodoForm[9];
    let todoFriOptionWeeklyRepeat = addTodoForm[10];
    let todoSatOptionWeeklyRepeat = addTodoForm[11];

    let todoWeeklyRepeatOptions = [
        todoSunOptionWeeklyRepeat,
        todoMonOptionWeeklyRepeat,
        todoTueOptionWeeklyRepeat,
        todoWedOptionWeeklyRepeat,
        todoThuOptionWeeklyRepeat,
        todoFriOptionWeeklyRepeat,
        todoSatOptionWeeklyRepeat
    ];

    let todoRepeatOnOrOffData = document.getElementById("toggleRepeat");

    let formData = [
        todoTitleInputValue,
        todoDueDateInputValue,
        placeInList_form,
        todoNumTimesRepeat,
        todoRepeatOption,
        todoWeeklyRepeatOptions,
        todoRepeatOnOrOffData
    ];



    return formData
}