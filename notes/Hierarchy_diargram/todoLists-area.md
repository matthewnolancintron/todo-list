# Hierarchy diagram of #todoLists-area
```
#todoLists-area ↴
        .todoListsHeader
                ↓
        .carousel_button left_arrow
                ↓
        #todo-lists
                ↓
        .carousel_button right_arrow
                ↓
        .addAndRemoveList_buttons_container
```


## subsection #todo-lists 
```
#todo-lists ↴
.todo-list todo-list_activeList ↴
                    todoItemSizingContainer
                            ↓
                    todoList_title
```

## subsection .addAndRemoveList_buttons_container
```
.addAndRemoveList_buttons_container↴
                                #addNewList
                                    ↓
                                #deleteList
                                    ↓
                                #renameList
```

