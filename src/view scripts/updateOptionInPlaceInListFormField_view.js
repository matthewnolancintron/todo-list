   export{updateOptionInPlaceInListFormField};

   //gets called every time a new list is added or removed
    function updateOptionInPlaceInListFormField(methodOfChange, nameOfList, indexOfListInSavedListsArray) {
        //for form move todo to list
        let placeInList_form = document.getElementById("placeInList_form");
  
        //for todo move todo to list
        let placeInList_todo = document.querySelectorAll(".placeInList_todo") || '';
        switch (methodOfChange) {
          case 'addOption':
            console.log(methodOfChange);
            console.log(nameOfList, 'name of list being added as an option');
            //add the option of the add list
            //value of option is equal to index in the savedLists array
            let option = document.createElement('option');
  
            option.classList.add('list-option');
            option.textContent = nameOfList;
            option.value = indexOfListInSavedListsArray;
  
            //add option to all the todos move selectors
            if (placeInList_todo != '') {
              placeInList_todo.forEach((node) => {
                node.append(option.cloneNode(true));
              });
            }
            placeInList_form.append(option);
            break;
          case 'removeOption':
            /**
             * todo remove option from move todo to list selector.
             * already works some how (not sure how?)
             */
            console.log(methodOfChange, 'method');
            console.log(indexOfListInSavedListsArray, 'indexOfList');
            console.log(nameOfList, 'name of list option to delete');
            //value of the option
            //will be the same as the index of that list in
            // the savedLists array
            let optionToDelete;
            let optionsArray = [];
            let highestValueOption;
            for (let option of placeInList_form) {
              if (option.value == indexOfListInSavedListsArray) {
                console.log(option, 'is option to remove');
                optionToDelete = option
              }
              optionsArray.push(option);
            }
  
            highestValueOption = optionsArray[optionsArray.length - 1].value;
  
            //remove option from dom
            optionToDelete.remove();
  
            //need to update values on the options
            /** 
             * if remove last option/element
             * option values don't shift
             */
            if (indexOfListInSavedListsArray == 0) {
              /**
               *  if remove first option/element
               *  option values shift -1
               */
              for (let option of placeInList_form) {
                option.value -= 1;
              }
              //
              console.log(placeInList_form.children, '0');
            }
  
  
            if (indexOfListInSavedListsArray > 0 && indexOfListInSavedListsArray < highestValueOption) {
              /**
               * if option removed's value/index is
               * greater than 0 but less then the
               * highest value option
               */
  
              optionsArray.forEach((x, index) => {
                /*
                 * every index/value after the index/value
                 * of the deleted option is shifted back by 1
                 * or a shift of -1 for those elements
                */
                if (index > indexOfListInSavedListsArray) {
                  x.value -= 1;
                }
              });
              //
            }
            break;
          default:
            break;
        }
      }