export { addEventToRepeatOptions };

function addEventToRepeatOptions(repeat_options,dayOfTheWeekSelector) {
    //'add todo' forum view state changes
    /* when day of the week is selected change
    display none to display flex and when another option
    is selected put it back to display none */
    let current_option = [...repeat_options.children].find((e) => {
        //console.log(e.selected);
        if (e.selected) {
            return e;
        }
    }).value;

    if (current_option == 'weeks' && !(dayOfTheWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
        dayOfTheWeekSelector.classList.add('show_dayOfTheWeekSelector');
      }
  
      //console.log(current_option);
  
      repeat_options.addEventListener('change', (e) => {
        let currently_selected = e.target.value;
        if (currently_selected == 'weeks' && !(dayOfTheWeekSelector.classList.contains('show_dayOfTheWeekSelector'))) {
          dayOfTheWeekSelector.classList.add('show_dayOfTheWeekSelector');
        } else if (dayOfTheWeekSelector.classList.contains("show_dayOfTheWeekSelector")) {
          dayOfTheWeekSelector.classList.remove("show_dayOfTheWeekSelector");
        }
      });
}