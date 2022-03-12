export { addEventToLeftTodoListButton };
import {shiftList} from './shiftList_view.js';

function addEventToLeftTodoListButton() {
    // <!-- add functionality to arrow buttons on the todo lists area -->
    let leftTodoListButton = document.querySelector('.left_arrow');
    leftTodoListButton.addEventListener('click', () => {
        shiftList('left');
    });

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            leftTodoListButton.classList.toggle('arrow_key_left');
            shiftList('left');
            setTimeout(() => {
              leftTodoListButton.classList.toggle('arrow_key_left');
            }, 100);
            break;
          default:
            break;
        }
      });
}