export {makeTodo};
const functionality = {
    //
    //updates existing step
    //create new step to add to steps array
    addStep(newStep){
        this.steps.push(newStep);
    },
    //
    /**
     * how? 
     */
    moveToList(){},
} 

function makeTodo({title,description,dueDate,priority,notes,steps,recurring,livesOnList}){
    //create todo and set functionality as the prototype
    let todo = Object.create(functionality);    
    /*props for todo */
    //name of the todo
    todo.tile = title;
    //short summary of todo
    todo.description = description;
    //
    todo.dueDate = dueDate;
    //
    todo.priority = priority;
    //
    todo.notes = notes;
    //array of steps
    todo.steps = steps;
    /**
    * recurring
    * describes how often
    * a todo ocurs
    * example
    * reccuring: daily
    * reccuring:every monday
    */
    todo.recurring = recurring;
    /**
    * name of the list the todo
    * currently belongs to
    * lives on default list by
    * default
    */
    todo.livesOnList = livesOnList;
    return todo;
};