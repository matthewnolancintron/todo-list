export { setListInView }

function setListInView() {
    let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));
    let todo_listsContainer = document.querySelector('#todo-lists');

    //run the code below the number of times equal to listInViewIndex
    for (let i = 0; i < listInViewIndex; i++) {
        todo_listsContainer.scrollLeft += (Math.round(todo_listsContainer.clientWidth));
    }
}