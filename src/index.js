/** 
 extra features:
 recurring due dates for building habits
 every monday at 8am...
 steps/sub-tasks and sections for individule todos
 create labels for todos
 filter todos
 light and dark and green theme

 kaban-style cards (kaban view)
 create multiple sections with headers
 drag todo's between sections to create
 a board. 
 
 display tasks on a calendar:
 multiple calendar views
 
 daily view shows all tasks on an hour/minute
 vertical or horizontal grid:

 weekly view shows all tasks for each 
 day of the week 

 monthly view see task on all days of the month:
 */

/**
 * separate application logic 
 * creating new todo setting todos as complete
 * changing todo priority etc from dom-related stuff
 * keep all of that in separate modules
 * 
 * my plan:
 * use MVC architecture.
 * 
 * model modules for application state
 * view modules for GUI/DOM manipulation
 * 
 * controller will be index.js and the user
 * I think?
 */

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
*/
//npx webpack or npx webpack --watch
import './styles.css'
import {makeTodo} from './makeTodo_model.js';



let todo = makeTodo(
    {
        title:'make stuff',
        description:'make a thing',
        dueDate:'due by end of the month',
        priority:'level 1 out of ?',
        notes:'plans is to finish this project before christmas',
        steps:['step 1','step 2'],
        recurring:'every day',
        livesOnList: 'default list'
    },
);
todo.addStep('step3');
console.log(todo.steps);
