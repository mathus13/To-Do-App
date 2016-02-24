"use strict";

var app = (function () {
    var todoCounter,
        inputText = document.getElementById("inputText"),
        todos = {};
    // creates the to-do items
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
    }
    // creates the DOM elements and assignes properties
    function createElements(todo_key) {
        // create elements
        var listItem = document.createElement("li"),
            select = document.createElement("select"),
            selectOpt0 = document.createElement("option"),
            selectOpt1 = document.createElement("option"),
            selectOpt2 = document.createElement("option"),
            selectOpt3 = document.createElement("option"),
            delButton = document.createElement("button"),
            checkbox = document.createElement("input"),
            textSpan = document.createElement("span");
        // listItem properties
        listItem.dataset.key = todo_key;
        listItem.className = "list-item_default";
        listItem.id = "listItem_" + todo_key;
        todos[todo_key].listed = true;
        // (priority level)select properties
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
        textSpan.className = "span_todo-text-default";
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
    }
    // assigns css class based on priority
    function setPriority(targetKey, todoPriority) {
        var targetSpan = document.getElementById('span_' + targetKey),
            targetLi = document.getElementById('listItem_' + targetKey);
        // changes priority of selected to-do to value from select
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
    // lists to-dos
    function listTodos(todo_key, todoText) {
        var i,
            j,
            k,
            listing,
            priorityCheck;
        // lists to-dos in order of priority (3, 2, 1, 0)
        for (k = 3; k < 0; k--) {
            for (i = 1; i < j; i++) {
                j = Object.keys(todos).length + 1;
                listing = todos['todo_' + i].listed;
                priorityCheck = todos['todo_' + i].priority;
                if (listing === false && priorityCheck === k) {
                    createElements(todo_key, todoText);
                    setPriority(todo_key, k);
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
            // pdate counter after creation
            updateCounter();
            createElements(todo_key);
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
        }
    });
    // drop down (select) event listener on change
    document.getElementById("todoList").addEventListener("change", function (e) {
        // on change for select
        if (e.target.className === "select") {
            console.log("select clicked: " + e.target.dataset.key);
            var targetKey = e.target.dataset.key,
                todoPriority = e.target.value;
            setPriority(targetKey, todoPriority);
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
