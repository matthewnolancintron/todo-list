export { addEventToRightTodoListButton };
import {shiftList} from './shiftList_view.js';

function addEventToRightTodoListButton(listInViewIndex) {
    let rightTodoListButton = document.querySelector('.right_arrow');
    rightTodoListButton.addEventListener('click', () => {
        shiftList('right');
    });
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowRight':
              //move to right arrow key event
            //console.log('right?')
            rightTodoListButton.classList.toggle('arrow_key_right');
            shiftList('right');
            setTimeout(() => {
              rightTodoListButton.classList.toggle('arrow_key_right');
            }, 100);
            break
          default:
            break;
        }
      });
}