var app = (function () {
    var  targetKey, targetId, targetSpan, targetLi, todoCounter, reorder, inputText = document.getElementById("inputText"),
        todos = {},
        todoPriority = 0;
    //creates the todo items
    updateCounter = function () {
        todoCounter = Object.keys(todos).length;
        return todoCounter;
    }
    itsTimeToMakeTheDonuts = function (todo_key, itemText) {
        todos[todo_key] = {};
        todos[todo_key].key = todo_key;
        todos[todo_key].listed = false;
        todos[todo_key].priority = 0;
        todos[todo_key].todoText = itemText;
    };
    //creates the dom elements and assignes properties
    doTheThing = function (todo_key, todoText) {
        //create elements
        var listItem = document.createElement("li"),
            select = document.createElement("select"),
            selectOpt0 = document.createElement("option"),
            selectOpt1 = document.createElement("option"),
            selectOpt2 = document.createElement("option"),
            selectOpt3 = document.createElement("option"),
            delButton = document.createElement("button"),
            checkbox = document.createElement("input"),
            textSpan = document.createElement("span");
        //listItem properties
        listItem.dataset.key = todo_key;
        listItem.className = "list-item_default";
        listItem.id = "listItem_"+todo_key;
        todos[todo_key].listed = true;
        //(priority level)select properties
        select.dataset.key = todo_key;
        select.className = "select";
        select.id = "select_"+todo_key;
        selectOpt0.value = 0;
        selectOpt0.innerText = 0;
        selectOpt1.innerText = 1;
        selectOpt2.innerText = 2;
        selectOpt3.innerText = 3;
        //(delete) button properties
        delButton.dataset.key = todo_key;
        delButton.className = "button_delete";
        delButton.id = "delButton_"+todo_key;
        //(completed) checkbox properties
        checkbox.dataset.key = todo_key;
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.id = "checkbox_"+todo_key;
        //(to do text) span properties
        textSpan.dataset.key = todo_key;
        textSpan.className = "span_todo-text-default";
        textSpan.id = 'span_'+todo_key;
        textSpan.innerText = todos[todo_key].todoText;
        //append elements 
        todoList.appendChild(listItem);
        listItem.appendChild(delButton);
        listItem.appendChild(checkbox);
        listItem.appendChild(select);
        select.appendChild(selectOpt0);
        select.appendChild(selectOpt1);
        select.appendChild(selectOpt2);
        select.appendChild(selectOpt3);
        listItem.appendChild(textSpan);
        return delButton.dataset.key, checkbox.dataset.key, select.dataset.key, textSpan.dataset.key;
    };
    //reassigns keys todo objects and dom elements after deleting a single element
    locksmith = function (deletedKey, newTotal) {
        //creates new key from old key and checks todos length
        var i, splitKey, newTargetNum, newKey,
        splitKey = deletedKey.split("_"),
        //rekey objects / elements if the deleted todo !== todos length (ie not the last one created)
        if (splitKey[1] < todoCounter) {
            //for (i = splitKey, ) {
                newKey = deletedKey,
                newTargetNum = Number(splitKey[1])+1,
                newTarget = 'todo_'+newKeyNum;
                //rekey todo object

                //rekey elements

                //update elements id

            //};
        };
    };
    //assigns css class based on priority
    casteSystem = function (targetKey, todoPriority){
        var targetSpan = document.getElementById('span_'+targetKey),
            targetLi = document.getElementById('listItem_'+targetKey);
        //changes priority of selected todo to value from select 
        switch (todoPriority) {
            case '0': 
                todos[targetKey].priority = 0;
                targetSpan.className = "span_todo-text-default";
                targetLi.className = "list-item_default";
                break;
            case '1':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "span_todo-text-p1";
                targetLi.className = "list-item_todo-p1";
                break;
            case '2':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "span_todo-text-p2";
                targetLi.className = "list-item_todo-p2";
                break;
            case '3':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "span_todo-text-p3";
                targetLi.className = "list-item_todo-p3";
                break;
            default:
                alert("oops you bwoke it");
        };
    };
    //removes dom elements - pass reorder as true when reordering
    delteted = function (targetKey, reorder) {
        var element = document.getElementById('listItem_'+targetKey);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
            element.remove();
        };
        console.log("removed elements for "+targetKey);
        todos[targetKey].listed = false;
        //removes todo objects
        deltaco = function (targetKey) {
            delete todos[targetKey];
            console.log("counter before re key"+todoCounter);
            updateCounter();
            locksmith (targetKey, todoCounter);
        };
        if (reorder === false) {
            deltaco (targetKey);
        };
    };    
    //reorders dom elements after deletion
    listTodos = function (todo_key, todoText) {
        var i, j, k, listing, priorityCheck, todoText, targetKey = todo_key;
        //lists todos in order of priority (3, 2, 1, 0)
        for (k = 3; k < 0; k--) {
            for (i = 1, j = Object.keys(todos).length + 1; i < j; i++) {
                listing = todos['todo_'+i].listed;
                priorityCheck = todos['todo_'+i].priority;
                if (listing === false && priorityCheck === k) {
                    doTheThing(todo_key, todoText);
                    casteSystem(todo_key, k);
                };
            };
        };
    };    
    //function execution triggered by pressing enter in input field
    inputText.onkeyup = function (event){
        var todo_key, itemText = inputText.value, i, todoText;
        //if input text value is not undefined or one space, proceed on enter key

        if (undefined === itemText || itemText === "" || itemText === " ") {
            return false;
            }
            if (event.which === 13) {
                // to be added: if end counter is 0 add todo objects from local storage
                updateCounter();
                console.log("counter before creation: "+todoCounter);
                keyAssignment = todoCounter + 1;
                console.log("key assigned: "+keyAssignment);
                todo_key = 'todo_' + keyAssignment;
                console.log("created "+todo_key);
                itsTimeToMakeTheDonuts(todo_key, itemText);
                //update counter after creation
                updateCounter();
                doTheThing(todo_key, todoText);
                document.getElementById("inputText").value = "";
        };
    };
    //todo list event listeners
    //delete button identity check
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for delete button
            if(e.target.className == "button_delete") {
                console.log("del button clicked "+e.target.dataset.key);
                delteted(e.target.dataset.key, false);
            };
        });
    //check box identity check
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for checkbox
            if(e.target.className == "checkbox") {
                console.log("checkbox clicked: "+e.target.dataset.key);
            };
        });
    //drop down (select) identity check on change
    document.getElementById("todoList").addEventListener("change", function(e) {
            //on click for select
            if(e.target.className == "select") {
                console.log("select clicked: "+e.target.dataset.key);
                var targetKey = e.target.dataset.key,
                    todoPriority = e.target.value;
                casteSystem(targetKey, todoPriority);
            };
        });    
    //span identity check on click
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for span
            if(e.target.className == "span_todo-text-default" || e.target.className == "span_todo-text-p1" || e.target.className == "span_todo-text-p2" || e.target.className == "span_todo-text-p3") {
                console.log("textSpan clicked: "+e.target.dataset.key);
            };
        }); 
} ());
