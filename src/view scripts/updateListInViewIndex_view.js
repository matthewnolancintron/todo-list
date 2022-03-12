    export{updateListInViewIndex};
    /*
    * helper function that updates listInViewIndex
       when user shifts list or adds new list
      or deletes list.
    */
      function updateListInViewIndex(direction, amount) {
        let listInViewIndex = parseInt(localStorage.getItem('listInViewIndex'));
        if (direction == 'up') {
          localStorage.setItem('listInViewIndex',listInViewIndex + amount);
          console.log(`list in view is at index ${listInViewIndex}`);
          //console.log(listInViewIndex, 'from shift', 'right');
        }
  
        if (direction == 'down') {
          localStorage.setItem('listInViewIndex',listInViewIndex - amount);
          //console.log(listInViewIndex, 'from shift', 'left');
          //console.log(`list in view is at index ${listInViewIndex}`);
        }
      }