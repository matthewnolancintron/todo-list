export { updateMoveTodoToList };
import { saveTodoToSavedListsArray } from './saveTodoToSavedListsArray_view.js';
import { deleteTodoFromList } from './deleteTodoFromList_view.js';

/**
 * 
 * todo: fix and test moveTodoToList behavior
 * 
 * when moving todo to another list
 * and the list has more than one todo,
 * for some reason the list the todo moved from
 * (at least tested with two todo items)
 * becomes the only todo in the the list that was moved from.
 * 
 * doesn't happen when only one todo is in the list moved from. 
 */

/**
 * after fixing this move onto,
 * test merge data and anonymous to permant 
 */

/**
 * when moving lists from the top of the lists everything works just fine
 * but if moving items from the bottom of the list it only works if all items are moved
 * other wise if moving just one item from the bottom of the list it replaces the 
 * new end of the list with the previous or just moved item the other list still gets
 * the new todo but the old list doesn't update correctly.
 */

/**
 * tracked down and fixed logic error:
 * logic error was in deleteTodoFromSavedListArray_view.js
 * when look for index of todo to delete it was returnign undefined due
 * to incorrectly written condtion. which was 
 * checking if x the element in the list being itterated through was
 * equal to the todoToDelete, and yet the items in the list where object
 * representations and the todoToDelete was a dom element also even if
 * todoToDelete was put into object data form by running through the
 * encode into object functions I built it would be checking to see
 * if object is equal to another object and from what I remember that
 * is not a good comparasion since it will only check if the objects point
 * to the same location in memory not if they have the same data
 * so I updated the condtion to compare the uuid of the object data and
 * the uuid in the dataset of the dom element. now the moveTodoToList
 * seem to work just fine 
 */

async function updateMoveTodoToList(e) {
    try {
        let isSaved = await saveTodoToSavedListsArray(e.target.parentElement, e.target.value);

        //remove todo from dom and saveLists
        if(isSaved){
            deleteTodoFromList(e.target.parentElement);
        }
    } catch (error) {
        console.error(error);
    }
}