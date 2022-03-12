export { shiftList };

/**
 * currently list in view
 * depends on page starting with the first
 * list element being in view on page start
 * but that isn't the case when user has already shifted
 * the element and then refreshes that page
 * 
 * for now it can't be helped but once the model
 * is created and this data is stored and persitent
 * when page refreshes the listInViewIndex won't reset 
 * to zero it will stay at the correct value.
 * 
 * for testing before creation of data model
 * or persistent data remember to set todolist item 1
 * into view and then refresh page so that data is 
 * aligned with view
 */

import {updateListInViewIndex} from './updateListInViewIndex_view';

function shiftList(direction) {
    let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));
    let todo_listsContainer = document.querySelector('#todo-lists');

    let all_todo_list = document.querySelectorAll('.todo-list');

    if (direction == 'left') {
        if (listInViewIndex != 0) {
            updateListInViewIndex('down', 1);
        }

        //console.log(all_todo_list.length,'all')
        //move scroll bar to the left.
        all_todo_list.forEach(element => {
            //console.log(element.scrollLeft);
        });
        todo_listsContainer.scrollLeft -= (Math.round(todo_listsContainer.clientWidth));
    }

    if (direction == 'right') {
        if (listInViewIndex < ((all_todo_list.length) - 1)) {
            updateListInViewIndex('up', 1);
        }

        //move scroll bar to the right.
        todo_listsContainer.scrollLeft += (Math.round(todo_listsContainer.clientWidth));

    }
}