"use strict";

var app = (function () {
    var todoCounter,
        inputText = document.getElementById("inputText"),
        todos = {},
        deletedTodos = {};
    // updates the counter
    function updateCounter() {
        todoCounter = Object.keys(todos).length;
        return todoCounter;
    }
    // creates objects
    function createObject(todo_key, itemText) {
        todos[todo_key] = {};
        todos[todo_key].key = todo_key;
        todos[todo_key].listed = false;
        todos[todo_key].priority = 0;
        todos[todo_key].todoText = itemText;
        todos[todo_key].completed = false;
        todos[todo_key].prevPriority = null;
    }
    // sets priority value from select and assigns css class
    function setPriority(targetKey, todoPriority, reorder) {
        var targetSpan = document.getElementById('span_' + targetKey),
            targetLi = document.getElementById('listItem_' + targetKey);
        // changes priority of selected to-do to value from select
        switch (todoPriority) {
        case '-1':
            todos[targetKey].priority = -1;
            targetSpan.className = "span_todo-text-completed";
            targetLi.className = "list-item_default";
            if (reorder === true) {
                reorderElements();
            }
            break;
        case '0':
            todos[targetKey].priority = 0;
            targetSpan.className = "span_todo-text-default";
            targetLi.className = "list-item_default";
            if (reorder === true) {
                reorderElements();
            }
            break;
        case '1':
            todos[targetKey].priority = 1;
            targetSpan.className = "span_todo-text-p1";
            targetLi.className = "list-item_todo-p1";
            if (reorder === true) {
                reorderElements();
            }
            break;
        case '2':
            todos[targetKey].priority = 2;
            targetSpan.className = "span_todo-text-p2";
            targetLi.className = "list-item_todo-p2";
            if (reorder === true) {
                reorderElements();
            }
            break;
        case '3':
            todos[targetKey].priority = 3;
            targetSpan.className = "span_todo-text-p3";
            targetLi.className = "list-item_todo-p3";
            if (reorder === true) {
                reorderElements();
            }
            break;
        default:
            alert("oops you bwoke it");
        }
    }
    // creates the DOM elements and assignes properties
    function createElements(todo_key, reorder) {
        // create elements
        var todoPriority,
            listItem = document.createElement("li"),
            delButton = document.createElement("button"),
            checkbox = document.createElement("input"),
            select = document.createElement("select"),
            selectOpt0 = document.createElement("option"),
            selectOpt1 = document.createElement("option"),
            selectOpt2 = document.createElement("option"),
            selectOpt3 = document.createElement("option"),
            textSpan = document.createElement("span");
        // listItem properties
        listItem.dataset.key = todo_key;
        listItem.id = "listItem_" + todo_key;
        todos[todo_key].listed = true;
        // (priority level) select properties
        select.dataset.key = todo_key;
        select.className = "select";
        select.id = "select_" + todo_key;
        selectOpt0.value = 0;
        selectOpt0.innerText = 0;
        selectOpt1.innerText = 1;
        selectOpt2.innerText = 2;
        selectOpt3.innerText = 3;
        // (delete) button properties
        delButton.dataset.key = todo_key;
        delButton.className = "button_delete";
        delButton.id = "delButton_" + todo_key;
        // (completed) checkbox properties
        checkbox.dataset.key = todo_key;
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.id = "checkbox_" + todo_key;
        // (to do text) span properties
        textSpan.dataset.key = todo_key;
        textSpan.id = 'span_' + todo_key;
        textSpan.innerText = todos[todo_key].todoText;
        // append elements
        todoList.appendChild(listItem);
        listItem.appendChild(delButton);
        listItem.appendChild(checkbox);
        listItem.appendChild(select);
        select.appendChild(selectOpt0);
        select.appendChild(selectOpt1);
        select.appendChild(selectOpt2);
        select.appendChild(selectOpt3);
        listItem.appendChild(textSpan);
        if (todos[todo_key].completed === true) {
            // checks checkbox is extant object is completed
            var element = document.getElementById("checkbox_" + todo_key);
            element.checked = true;
        }
        // invoke setPriority to assign span and listItem classes
        todoPriority = todos[todo_key].priority.toString();
        console.log(reorder);
        setPriority(todo_key, todoPriority, reorder);
    }
    // sets completed property and assigns css class
    function setCompleted(targetKey, checked) {
        var element,
            todoPriority;
        if (todos[targetKey].completed === false && checked === true) {
            todos[targetKey].completed = true;
            todos[targetKey].prevPriority = todos[targetKey].priority;
            setPriority(targetKey, "-1", true);
        } else {
            if (todos[targetKey].completed === true && checked === false) {
                todos[targetKey].completed = false;
                todoPriority = todos[targetKey].prevPriority.toString();
                setPriority(targetKey, todoPriority, true);
                todos[targetKey].prevPriority = null;
            }
        }
    }
    // removes to-do objects
    function removeObject(targetKey) {
        delete todos[targetKey];
        updateCounter();
    }
    // removes DOM elements - pass reorder as true when reordering
    function removeElements(targetKey, reorder) {
        var element = document.getElementById('listItem_' + targetKey);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
            element.remove();
        }
        todos[targetKey].listed = false;
        if (reorder === false) {
            removeObject(targetKey);
        }
    }
    // reorders DOM elements when priority or completed values change
    function reorderElements() {
        var i;
        // remove all DOM elements
        console.log("test 1")
        // recreate DOM elements in order of priority (3, 2, 1, 0, -1)
        for (i = 3; i > -2; i--) {
            for (var todoByKey in todos) {
                if (todos.hasOwnProperty(todoByKey) && todos[todoByKey].priority === i) {
                    // remove elements, pass reorder argument as true to retain objects
                    removeElements(todoByKey, true);
                    // recreate elements, pass reorder argument as false to prevent infinite loop
                    createElements(todoByKey, false);
                }
            }
        }
    }
    // function execution triggered by pressing enter in input field
    inputText.onkeyup = function (event) {
        var keyAssignment,
            todo_key,
            itemText = inputText.value;
        // if input text value is not undefined or one space, proceed on enter key
        if (undefined === itemText || itemText === "" || itemText === " ") {
            return false;
        }
        if (event.which === 13) {
            // to be added: if end counter is 0 add to-do objects from local storage
            updateCounter();
            keyAssignment = todoCounter + 1;
            todo_key = 'todo_' + keyAssignment;
            createObject(todo_key, itemText);
            // update counter after creation
            updateCounter();
            createElements(todo_key, false);
            document.getElementById("inputText").value = "";
        }
    };
    // delete button event listener on click
    document.getElementById("todoList").addEventListener("click", function (e) {
        // on click for delete button
        if (e.target.className === "button_delete") {
            console.log("del button clicked " + e.target.dataset.key);
            removeElements(e.target.dataset.key, false);
        }
    });
    // check box identity check
    document.getElementById("todoList").addEventListener("click", function (e) {
        // on click for checkbox
        if (e.target.className === "checkbox") {
            console.log("checkbox clicked: " + e.target.dataset.key);
            setCompleted(e.target.dataset.key, e.target.checked);
        }
    });
    // drop down (select) event listener on change
    document.getElementById("todoList").addEventListener("change", function (e) {
        // on change for select
        if (e.target.className === "select") {
            console.log("select clicked: " + e.target.dataset.key);
            setPriority(e.target.dataset.key, e.target.value, true);
        }
    });
    // span identity check on click
    document.getElementById("todoList").addEventListener("click", function (e) {
        // on click for span
        if (e.target.className === "span_todo-text-default" || e.target.className === "span_todo-text-p1" || e.target.className === "span_todo-text-p2" || e.target.className === "span_todo-text-p3") {
            console.log("textSpan clicked: " + e.target.dataset.key);
        }
    });
}());
