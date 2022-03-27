export{buildTodoWithAddTodoFormData};
import { updateMoveTodoToList } from './updateMoveTodoToList_view.js';
import {deleteTodoFromList} from './deleteTodoFromList_view.js';
import { updateTodoInSavedListsArray } from './updateTodoInSavedListsArray_view.js';


//uuid
const {v4 : uuidv4} = require('uuid');

/**
 * builds a todo element based on the form data
 * present when the user pressed confirm
 * and returns the todo 
 */
function buildTodoWithAddTodoFormData(formData) {
    console.log(formData, 'building a todo');

    let todoListItem = document.createElement('li');
    todoListItem.classList.add("todo-item");

    /**
     * add uuid to each todo using a data attribute of uuid
     * need for storing in local storage
     * 
     * get from dom via:
     *  document.querySelector("[data-uuid='uuid from local storages savedLists array']");
     */
     todoListItem.dataset.uuid = uuidv4();

    //buliding mark as complete on todo
    let todoListItemIsComplete = document.createElement('input');
    todoListItemIsComplete.setAttribute('type', 'checkbox');
    todoListItemIsComplete.setAttribute('id', 'markTodoComplete');

    todoListItemIsComplete.addEventListener('change', (e) => {
        //if target checked
        if (e.target.checked) {
            //for now just delete the todo
            // could add feature to move todo to
            // completed todo list later.
            setTimeout(function () { deleteTodoFromList(todoListItem); }, '1000');
        }
    })

    let todoListItemTitle = document.createElement('p');
    todoListItemTitle.classList.add("todo-item_title");
    todoListItemTitle.textContent = "Title: " + formData[0].value;

    let todoListItemDueDate = document.createElement('p');
    todoListItemDueDate.classList.add("todo-item_dueDate");
    todoListItemDueDate.textContent = "Due: " + formData[1].value;

    let todoListItemRepeat = document.createElement('p');
    todoListItemRepeat.classList.add("todo-item_repeat");

    let todoListItemDeleteTodoButton = document.createElement('button');
    todoListItemDeleteTodoButton.textContent = 'delete';
    todoListItemDeleteTodoButton.addEventListener('click', () => {
        deleteTodoFromList(todoListItem);
    });

    //
    let todoListItemExpandButton = document.createElement('button');
    todoListItemExpandButton.textContent = "expand todo";
    todoListItemExpandButton.classList.add("expandTodoButton");
    todoListItemExpandButton.addEventListener('click', (e) => {
        //get todo item element to work on
        let todoItem = e.target.parentElement;

        //visually expand the todo
        todoItem.classList.add('expand-Todo');

        //
        let fields = Array.from(todoItem.children).slice(1, 4);

        let todoTitle = fields[0];
        let todoDueDate = fields[1];
        let todoRepeat = fields[2];

        //editable todo title
        let editableTodoTitleContainer = document.createElement('div');
        editableTodoTitleContainer.classList.add('editableTodoFieldContainer');
        let newTodoTitle = todoTitle.cloneNode(true);
        let renameTodoButton = document.createElement('button');
        renameTodoButton.classList.add('renameTodoButton');
        renameTodoButton.textContent = 'rename title'

        //rename todo
        renameTodoButton.addEventListener('click', (e) => {
            let todoTitleToEdit = e.target.previousSibling;
            let renameInput = document.createElement('input');
            renameInput.type = 'text';
            renameInput.placeholder = 'rename me';

            renameInput.addEventListener("keyup", (e) => {
                if (e.key == "Enter") {
                    e.target.blur();
                }
            });

            renameInput.addEventListener('blur', (e) => {
                let input = e.target;
                let newTodoTitleName = input.value;
                let updatedTodoTitle = newTodoTitle.cloneNode(true);
                updatedTodoTitle.textContent = `Title: ${newTodoTitleName}`;
                input.replaceWith(updatedTodoTitle);
            });

            todoTitleToEdit.replaceWith(renameInput)
        });

        //asemble
        editableTodoTitleContainer.append(newTodoTitle);
        editableTodoTitleContainer.append(renameTodoButton);

        //
        todoTitle.replaceWith(editableTodoTitleContainer);

        //editable due date
        /**
         * create editable container 
         * that includes the due date and a change due date button
         * replace current due date with editable version
         * 
         * add event to the chagne date button
         * when clicked
         * replace with an input element
         * of type date ... todo work on later.
         */
        let editableTodoDueDateContainer = document.createElement('div');
        editableTodoDueDateContainer.classList.add('editableTodoFieldContainer');
        let newDueDate = todoDueDate.cloneNode(true);
        let changeDueDateButton = document.createElement('button');
        changeDueDateButton.classList.add('changeDueDateButton');
        changeDueDateButton.textContent = 'change due date'

        //change due date event
        changeDueDateButton.addEventListener('click', (e) => {
            let todoDueDateToEdit = e.target.previousSibling;
            let dueDateInput = document.createElement('input');
            dueDateInput.type = 'date';

            dueDateInput.addEventListener("keyup", (e) => {
                if (e.key == "Enter") {
                    e.target.blur();
                }
            });

            dueDateInput.addEventListener('blur', (e) => {
                let input = e.target;
                let newTodoDueDate = input.value;
                let updatedTodoDueDate = newTodoTitle.cloneNode(true);
                updatedTodoDueDate.textContent = 'Due: ' + newTodoDueDate;
                input.replaceWith(updatedTodoDueDate);
            });

            todoDueDateToEdit.replaceWith(dueDateInput);
        });

        //
        editableTodoDueDateContainer.append(newDueDate);
        editableTodoDueDateContainer.append(changeDueDateButton);

        //
        todoDueDate.replaceWith(editableTodoDueDateContainer);

        //editable repeat
        let editableTodoRepeatContainer = document.createElement('div');
        editableTodoRepeatContainer.classList.add('editableTodoFieldContainer');
        editableTodoRepeatContainer.classList.add('editableTodoFieldContainer_repeat')
        let newRepeat = todoRepeat.cloneNode(true);
        let editRepeatButton = document.createElement('button');
        editRepeatButton.classList.add('editRepeatButton');
        editRepeatButton.textContent = 'edit repeat';

        //start of edit repeat event
        editRepeatButton.addEventListener('click', (e) => {
            let todoRepeatToEdit = e.target.previousSibling;
            let repeatFormField = document.querySelector('.repeat_option_sub_container').cloneNode(true);
            let onOffToggleButton = document.querySelector('#toggleRepeat').cloneNode(true);

            onOffToggleButton.addEventListener('click', (e) => {
                /**
                 * if day of the week selector is open
                 * due to option being set to weeks then 
                 * close when toggling to off by setting the option
                 * back to days before disableing.
                 */
                switch (e.target.textContent) {
                    case "OFF":
                        e.target.textContent = "ON"
                        break;
                    case "ON":
                        e.target.textContent = "OFF"
                    default:
                        break;
                }

                let numRepeatElement = e.target.previousElementSibling.previousElementSibling;
                let repeat_options = numRepeatElement.nextElementSibling;

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

            repeatFormField.append(onOffToggleButton);


            /**
             * updated view for select element 
             */
            let repeat_select_options = repeatFormField.children[2];
            let todo_dayOfWeekSelector = document.querySelector('.dayOfTheWeekSelector').cloneNode(true);


            repeatFormField.append(todo_dayOfWeekSelector);

            repeat_select_options.addEventListener('change', (e) => {
                let currently_selected = e.target.value;
                if (currently_selected == 'weeks' && !(todo_dayOfWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
                    todo_dayOfWeekSelector.classList.add('show_dayOfTheWeekSelector');
                } else if (todo_dayOfWeekSelector.classList.contains("show_dayOfTheWeekSelector")) {
                    todo_dayOfWeekSelector.classList.remove("show_dayOfTheWeekSelector");
                }
            });

            let confirmChangeButton = document.createElement('button');
            confirmChangeButton.textContent = 'ok';

            confirmChangeButton.addEventListener('click', (e) => {
                let frequencyOfRepeat = repeat_select_options.previousElementSibling.value;
                let typeOfFrequency = repeat_select_options.value;

                let daysArray = Array.from(todo_dayOfWeekSelector.children);
                console.log(daysArray, 'daysArray');

                //hold new repeat textcontent
                let repeatTextContent;
                if (onOffToggleButton.textContent == "ON" && frequencyOfRepeat > 0) {
                    console.log('check')
                    switch (typeOfFrequency) {
                        case 'days':
                            if (frequencyOfRepeat == 1) {
                                console.log('check0')
                                repeatTextContent = `Repeat: daily`;
                            } else {
                                repeatTextContent = `Repeat: every ${frequencyOfRepeat} days`;
                            }
                            break;
                        case 'weeks':
                            //boolean values for the days of the week checkboxes
                            // to be used in conditional for forming the repeat phrase
                            let isSunChecked;
                            let isMonChecked;
                            let isTueChecked;
                            let isWedChecked;
                            let isThuChecked;
                            let isFriChecked;
                            let isSatChecked;

                            //used to store the days checked if any
                            let daysChecked = [];

                            console.log(daysArray, 'daysArray');

                            //check which checkBox are set to on
                            daysArray.forEach((day, index, array) => {
                                //used to see what days are checked
                                switch (index) {
                                    case 0:
                                        //check if sun is checked
                                        isSunChecked = array[index].children[0].control.checked
                                        break;
                                    case 1:
                                        //check if mon is checked
                                        isMonChecked = array[index].children[0].control.checked
                                        break;
                                    case 2:
                                        //check if tue is checked
                                        isTueChecked = array[index].children[0].control.checked
                                        break;
                                    case 3:
                                        //check if wed is checked
                                        isWedChecked = array[index].children[0].control.checked
                                        break;
                                    case 4:
                                        //check if thu is checked
                                        isThuChecked = array[index].children[0].control.checked
                                        break;
                                    case 5:
                                        //check if fri is checked
                                        isFriChecked = array[index].children[0].control.checked
                                        break;
                                    case 6:
                                        //check if sat is checked
                                        isSatChecked = array[index].children[0].control.checked
                                        break;
                                    default:
                                        break;
                                }
                            });

                            //add the specific days to the
                            //dayschecked array
                            if (isSunChecked) {
                                daysChecked.push('sun');
                            }

                            if (isMonChecked) {
                                daysChecked.push('mon');
                            }

                            if (isTueChecked) {
                                daysChecked.push('tue');
                            }

                            if (isWedChecked) {
                                daysChecked.push('wed');
                            }

                            if (isThuChecked) {
                                daysChecked.push('thu');
                            }

                            if (isFriChecked) {
                                daysChecked.push('fri');
                            }

                            if (isSatChecked) {
                                daysChecked.push('sat');
                            }

                            console.log('daysCheckedArray', daysChecked);

                            //set to true if all days are checked
                            let isAllDaysChecked = Boolean(
                                isSunChecked &&
                                isMonChecked &&
                                isTueChecked &&
                                isWedChecked &&
                                isThuChecked &&
                                isFriChecked &&
                                isSatChecked
                            );
                            console.log('isAllDaysChecked', isAllDaysChecked);

                            //set to true if at least one day is checked
                            let isAnyDayCheck = Boolean(
                                isSunChecked ||
                                isMonChecked ||
                                isTueChecked ||
                                isWedChecked ||
                                isThuChecked ||
                                isFriChecked ||
                                isSatChecked
                            );
                            console.log('isAnyDaysCheck', isAnyDayCheck);

                            let isWeekDaysOnlyChecked = Boolean(
                                !(isSatChecked && isSunChecked) &&
                                (isMonChecked &&
                                    isTueChecked &&
                                    isWedChecked &&
                                    isThuChecked &&
                                    isFriChecked)
                            );
                            console.log('isWeekDaysOnlyChecked', isWeekDaysOnlyChecked);

                            let isWeekendOnlyChecked = Boolean(
                                !(
                                    isMonChecked ||
                                    isTueChecked ||
                                    isWedChecked ||
                                    isThuChecked ||
                                    isFriChecked
                                ) &&
                                (isSunChecked &&
                                    isSatChecked)
                            );
                            console.log('isWeekendOnlyChecked', isWeekendOnlyChecked);

                            //form the days checked into a phrase
                            let daysCheckedPhrase = '';
                            if (daysChecked.length == 1) {
                                daysCheckedPhrase = `${daysChecked[0]}`;
                            } else if (daysChecked.length == 2) {
                                daysCheckedPhrase = daysChecked.join(' and ');
                            } else if (daysChecked.length > 2 && !(isAllDaysChecked)) {
                                daysCheckedPhrase = daysChecked.slice(0, -1).join(',') + ` and ${daysChecked[daysChecked.length - 1]} `;
                            }

                            //
                            if (isWeekDaysOnlyChecked) {
                                console.log('in here?')
                                daysCheckedPhrase = "weekdays";
                            }

                            if (isWeekendOnlyChecked) {
                                daysCheckedPhrase = "weekends";
                            }

                            //plural and singular 
                            if (frequencyOfRepeat == 1) {
                                console.log('singular');
                                //singular
                                if (isAllDaysChecked) {
                                    repeatTextContent = "Repeat: weekly";
                                } else if (isAnyDayCheck) {
                                    /**
                                    * if any configuration of the checkboxes are set
                                    * to on sentence structure should be the following
                                    * Repeat: weekly on (days selected) 
                                    * example: sun and sat
                                    * Repeat: weekly on sun and sat/ sun, sat, mon and tue
                                    */
                                    repeatTextContent = `Repeat: Weekly on ${daysCheckedPhrase} `;
                                }
                            }

                            if (frequencyOfRepeat > 1) {
                                //plural
                                if (isAllDaysChecked) {
                                    repeatTextContent = `Repeat: every ${frequencyOfRepeat} weeks`;
                                } else if (isAnyDayCheck) {
                                    /** 
                                     * if any configuration of the checkboxes are set
                                     * to on sentence structure should be the following
                                     * if numtimes > 1
                                     * Repeat: every numtimes weeks on sat/ sun, sat, mon and tue
                                     */
                                    repeatTextContent = `Repeat: every ${frequencyOfRepeat} weeks on ${daysCheckedPhrase}`;
                                }
                            }
                            break;
                        case 'months':
                            //plural singular
                            if (frequencyOfRepeat == 1) {
                                //singular
                                repeatTextContent = 'Repeat: monthly';
                            } else if (frequencyOfRepeat > 1) {
                                //plural
                                repeatTextContent = `Repeat: every ${frequencyOfRepeat} months`;
                            }
                            break;
                        case 'years':
                            //plural singular
                            if (frequencyOfRepeat == 1) {
                                //singular
                                repeatTextContent = 'Repeat: yearly';
                            } else if (frequencyOfRepeat > 1) {
                                //plural
                                repeatTextContent = `Repeat: every ${frequencyOfRepeat} years`;
                            }
                            break;
                        default:
                            break;
                    }

                } else {
                    //user did not select repeat
                    repeatTextContent = 'repeat: off'
                }

                console.log(repeatTextContent, 'phrase it');

                let repeatElement = document.createElement('p');
                repeatElement.textContent = repeatTextContent;
                repeatElement.classList.add('todo-item_repeat');
                repeatFormField.replaceWith(repeatElement);
                confirmChangeButton.remove();
                cancelButton.remove();
                editableTodoRepeatContainer.append(editRepeatButton);
            });

            let cancelButton = document.createElement('button');
            cancelButton.textContent = 'cancel';

            cancelButton.addEventListener('click', (e) => {
                console.log(e, 'cancel');
                /**
                 * make sure to save a copy of what was set before
                 * edit was selected and put back the saved copy
                 * on cancel
                 * 
                 * todo make saved copy
                 */
                repeatFormField.replaceWith(todoRepeatToEdit);
                confirmChangeButton.remove();
                cancelButton.remove();
                editableTodoRepeatContainer.append(editRepeatButton);
            });

            editableTodoRepeatContainer.append(confirmChangeButton);
            editableTodoRepeatContainer.append(cancelButton);

            e.target.remove();
            console.log(todoRepeatToEdit, '?');
            todoRepeatToEdit.replaceWith(repeatFormField);
        });
        //end of edit repeat event

        editableTodoRepeatContainer.append(newRepeat);
        editableTodoRepeatContainer.append(editRepeatButton);

        todoRepeat.replaceWith(editableTodoRepeatContainer);

        /**
         * notes feature:
         * add a notes text box with scroll
         * a save button for the notes or save on change
         * 
         * for now add notes to a global array or
         * wait until model is built and save to object instead
         * 
         * wait on notes features and focus on making fields
         * editable when expanded.
         * 
         * after this feature working building the model
         * and controller and fragmenting this file into
         * components.
         */

        // replace expand button but save it for later
        let expandTodoButton = e.target;
        let collapseTodoButon = e.target.cloneNode(true);
        collapseTodoButon.textContent = 'collapse and save todo';
        expandTodoButton.replaceWith(collapseTodoButon);

        //collapse todo
        collapseTodoButon.addEventListener('click', (e) => {
            //
            todoItem.classList.remove('expand-Todo');

            let newTitle = document.createElement('p');
            let dueDate = document.createElement('p');
            let newerRepeat = document.createElement('p');

            newTitle.classList.add('todo-item_title');
            dueDate.classList.add('todo-item_dueDate');
            newerRepeat.classList.add('todo-item_repeat');

            newTitle.textContent = `${editableTodoTitleContainer.children[0].textContent}`;
            dueDate.textContent = `${editableTodoDueDateContainer.children[0].textContent}`;
            newerRepeat.textContent = `${editableTodoRepeatContainer.children[0].textContent}`;

            editableTodoTitleContainer.replaceWith(newTitle);
            editableTodoDueDateContainer.replaceWith(dueDate);
            editableTodoRepeatContainer.replaceWith(newerRepeat);

            /**
             * replace collapse and save with expand
             */
            collapseTodoButon.replaceWith(expandTodoButton);

            //update todo in savedLists array
            updateTodoInSavedListsArray(todoListItem);

        });


    });


    console.log(formData[5], 'repeat');
    //code for handling the repeat option text
    if (formData[6].textContent == "ON" && formData[3].value > 0) {
        //console.log('repeat on', formData[5].textContent);
        //console.log('is num times', formData[2]);
        //console.log('is repeat options', formData[3]);

        switch (formData[4].value) {
            case 'days':
                if (formData[3].value == 1) {
                    todoListItemRepeat.textContent = `Repeat: daily`;
                } else {
                    //console.log(formData[2], 'datacheck');
                    todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} days`;
                }
                break;
            case 'weeks':
                //boolean values for the days of the week checkboxes
                // to be used in conditional for forming the repeat phrase
                let isSunChecked;
                let isMonChecked;
                let isTueChecked;
                let isWedChecked;
                let isThuChecked;
                let isFriChecked;
                let isSatChecked;

                //used to store the days checked if any
                let daysChecked = [];

                //check which checkBox are set to on
                formData[5].forEach((day, index, array) => {
                    //used to see what days are checked
                    switch (index) {
                        case 0:
                            //check if sun is checked
                            isSunChecked = array[index].checked

                            break;
                        case 1:
                            //check if mon is checked
                            isMonChecked = array[index].checked
                            break;
                        case 2:
                            //check if tue is checked
                            isTueChecked = array[index].checked
                            break;
                        case 3:
                            //check if wed is checked
                            isWedChecked = array[index].checked
                            break;
                        case 4:
                            //check if thu is checked
                            isThuChecked = array[index].checked
                            break;
                        case 5:
                            //check if fri is checked
                            isFriChecked = array[index].checked
                            break;
                        case 6:
                            //check if sat is checked
                            isSatChecked = array[index].checked
                            break;
                        default:
                            break;
                    }
                });

                //add the specific days to the
                //dayschecked array
                if (isSunChecked) {
                    daysChecked.push('sun');
                }

                if (isMonChecked) {
                    daysChecked.push('mon');
                }

                if (isTueChecked) {
                    daysChecked.push('tue');
                }

                if (isWedChecked) {
                    daysChecked.push('wed');
                }

                if (isThuChecked) {
                    daysChecked.push('thu');
                }

                if (isFriChecked) {
                    daysChecked.push('fri');
                }

                if (isSatChecked) {
                    daysChecked.push('sat');
                }

                //set to true if all days are checked
                let isAllDaysChecked = Boolean(
                    isSunChecked &&
                    isMonChecked &&
                    isTueChecked &&
                    isWedChecked &&
                    isThuChecked &&
                    isFriChecked &&
                    isSatChecked
                );

                //set to true if at least one day is checked
                let isAnyDayCheck = Boolean(
                    isSunChecked ||
                    isMonChecked ||
                    isTueChecked ||
                    isWedChecked ||
                    isThuChecked ||
                    isFriChecked ||
                    isSatChecked
                );

                let isWeekDaysOnlyChecked = Boolean(
                    !(isSatChecked && isSunChecked) && !(isSatChecked || isSunChecked) &&
                    (isMonChecked &&
                        isTueChecked &&
                        isWedChecked &&
                        isThuChecked &&
                        isFriChecked)
                );

                let isWeekendOnlyChecked = Boolean(
                    !(
                        isMonChecked ||
                        isTueChecked ||
                        isWedChecked ||
                        isThuChecked ||
                        isFriChecked
                    ) &&
                    (isSunChecked &&
                        isSatChecked)
                );

                //form the days checked into a phrase
                let daysCheckedPhrase = '';
                if (daysChecked.length == 1) {
                    daysCheckedPhrase = `${daysChecked[0]}`;
                } else if (daysChecked.length == 2) {
                    daysCheckedPhrase = daysChecked.join(' and ');
                } else if (daysChecked.length > 2 && !(isAllDaysChecked)) {
                    daysCheckedPhrase = daysChecked.slice(0, -1).join(',') + ` and ${daysChecked[daysChecked.length - 1]} `;
                }

                //
                if (isWeekDaysOnlyChecked) {
                    daysCheckedPhrase = "weekdays";
                }

                //
                if (isWeekendOnlyChecked) {
                    daysCheckedPhrase = "weekends";
                }

                //plural and singular 
                if (formData[3].value == 1) {
                    console.log(formData[3].value, 'singular');
                    //singular
                    if (isAllDaysChecked) {
                        todoListItemRepeat.textContent = "Repeat: weekly";
                    } else if (isAnyDayCheck) {
                        /**
                        * if any configuration of the checkboxes are set
                        * to on sentence structure should be the following
                        * Repeat: weekly on (days selected) 
                        * example: sun and sat
                        * Repeat: weekly on sun and sat/ sun, sat, mon and tue
                        */
                        todoListItemRepeat.textContent = `Repeat: Weekly on ${daysCheckedPhrase} `;
                    }
                }

                if (formData[3].value > 1) {
                    //plural
                    if (isAllDaysChecked) {
                        todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} weeks`;
                    } else if (isAnyDayCheck) {
                        /** 
                         * if any configuration of the checkboxes are set
                         * to on sentence structure should be the following
                         * if numtimes > 1
                         * Repeat: every numtimes weeks on sat/ sun, sat, mon and tue
                         */
                        todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} weeks on ${daysCheckedPhrase}`;
                    }
                }
                break;
            case 'months':
                //plural singular
                if (formData[3].value == 1) {
                    //singular
                    todoListItemRepeat.textContent = 'Repeat: monthly';
                } else if (formData[3].value > 1) {
                    //plural
                    todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} months`;
                }
                break;
            case 'years':
                //plural singular
                if (formData[3].value == 1) {
                    //singular
                    todoListItemRepeat.textContent = 'Repeat: yearly';
                } else if (formData[3].value > 1) {
                    //plural
                    todoListItemRepeat.textContent = `Repeat: every ${formData[3].value} years`;
                }
                break;
            default:
                break;
        }

    } else {
        //user did not select repeat
        todoListItemRepeat.textContent = 'repeat: off'
    }

    console.log(todoListItemRepeat.textContent, 'check value');

    let placeInList = document.getElementById('placeInList_form');
    console.log(placeInList, 'placeInList');
    let moveTodoToList = placeInList.cloneNode(true);
    //update id/class and name
    moveTodoToList.id = "placeInList_todo";
    moveTodoToList.name = "placeInList_todo";
    moveTodoToList.classList.add('placeInList_todo');

    //set value or option that will be shown
    moveTodoToList.value = placeInList.value;

    //add event listner
    moveTodoToList.addEventListener('change', (e) => {
        updateMoveTodoToList(e);
    });

    //asemble todo 
    todoListItem.append(todoListItemIsComplete)
    todoListItem.append(todoListItemTitle);
    todoListItem.append(todoListItemDueDate);
    todoListItem.append(todoListItemRepeat);
    todoListItem.append(moveTodoToList);
    todoListItem.append(todoListItemDeleteTodoButton);
    todoListItem.append(todoListItemExpandButton);

    return [todoListItem, formData[2]];
}