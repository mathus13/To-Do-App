"use strict";

var app = {};
(function ($, window) {
    var todoCounter,
        todos = {},
        byPriority = {},
        $content,
        $todosUL,
        $inputText;
    $content = $('div.content');
    $todosUL = $content.find('#todoList');
    $inputText = $content.find('#inputText');

    function store() {
        localStorage.setItem('localTodos', JSON.stringify(todos));
        localStorage.setItem('localCounter', todoCounter);
    }

    // creates objects
    function createObject(todo_key, itemText) {
        var todo = {};
        todo.key = todo_key;
        todo.priority = 0;
        todo.todoText = itemText;
        todo.completed = false;
        todo.prevPriority = 0;
        todos[todo_key] = todo;
        store();
    }

    // removes to-do objects
    function removeObject(targetKey) {
        delete todos[targetKey];
        store();
    }

    // removes DOM elements - pass reorder as true when reordering
    function removeElements(targetKey, reorder) {
        var parentElement = $todosUL.find("li#listItem_" + targetKey);
        parentElement.empty();
        parentElement.remove();
        if (reorder === false) {
            removeObject(targetKey);
        }
    }

    // creates the DOM elements and assigns properties - pass reorder as true when reordering
    function createElement(todo_key, reorder) {
        // create elements
        var todoPriority, html;
        html = '<li class="list-group-item" id="listItem_{{todo_key}}" data-key="{{todo_key}}">' +
            '   <div class="row">' +
            '       <div class="col-xs-1">' +
            '           <div class="checkbox form-control">' +
            '               <label><input type="checkbox" class="checkbox" id="checkbox_{{todo_key}}" data-key="{{todo_key}}"/></label>' +
            '           </div>' +
            '       </div>' +
            '       <div class="col-xs-2">' +
            '           <select class="select form-control" id="select_{{todo_key}}" data-key="{{todo_key}}">' +
            '               <option value="0">0</option>' +
            '               <option value="1">1</option>' +
            '               <option value="2">2</option>' +
            '               <option value="3">3</option>' +
            '           </select>' +
            '       </div>' +
            '       <div class="col-xs-7 col-xs-offset-1">' +
            '           <span class="h3" id="spanText_{{todo_key}}" data-key="{{todo_key}}">{{todo_text}}</span>' +
            '       </div>' +
            '       <div class="col-xs-1">' +
            '           <button class="button_delete btn btn-danger" id="delButton_{{todo_key}}" data-key="{{todo_key}}">' +
            '               <span class="glyphicon glyphicon-trash"></span>' +
            '           </button>' +
            '       </div>' +
            '   </div>' +
            '</li>';
        html = html.replace(/{{todo_key}}/g, todo_key);
        html = html.replace(/{{todo_text}}/g, todos[todo_key].todoText);
        $todosUL.append(html);
        // checks checkbox if item is completed
        if (todos[todo_key].completed === true) {
            $todosUL.find('checkbox#checkbox_' + todo_key).attr("checked", true);
        }
        // invoke setPriority to assign span and listItem classes
        todoPriority = todos[todo_key].priority.toString();
        setPriority(todo_key, todoPriority, reorder);
    }

    // reorders DOM elements (priority / completed) , pass retrieve as true for localStorage calls
    function reorderElements(retrieve) {
        var i, todoByKey;
        // recreate DOM elements in order of priority (3, 2, 1, 0, -1)
        for (i = 3; i > -2; i--) {
            for (todoByKey in todos) {
                if (todos.hasOwnProperty(todoByKey) && todos[todoByKey].priority == i) {
                    if (retrieve === false) {
                        // remove elements, passing arg2 (reorder) as true to retain objects
                        removeElements(todoByKey, true);
                    }
                    // recreate elements, passing arg2 (reorder) as false to prevent infinite loop
                    createElement(todoByKey, false);
                    $todosUL.find('select#select_' + todoByKey).val(todos[todoByKey].priority);
                }
            }
        }
    }

    // sets priority value if changed via select and assigns css classes
    function setPriority(targetKey, todoPriority, reorder) {
        var targetSpan = $content.find('span#spanText_' + targetKey),
            targetLi = $todosUL.find('#listItem_' + targetKey),
            targetSelect = $todosUL.find('select#select_' + targetKey);
        // changes priority of selected to-do to value from select
        switch (todoPriority) {
        case '-1':
            todos[targetKey].priority = todoPriority;
            targetSpan.attr("class", "span_todo-text-completed");
            targetLi.attr("class", "list-item_default");
            if (reorder === true) {
                reorderElements(false);
            }
            break;
        case '0':
            todos[targetKey].priority = todoPriority;
            targetSpan.attr("class", "span_todo-text-default");
            targetLi.attr("class", "list-item_default");
            if (reorder === true) {
                reorderElements(false);
            }
            break;
        case '1':
            todos[targetKey].priority = todoPriority;
            targetSpan.attr("class", "span_todo-text-p1");
            targetLi.attr("class", "list-item_todo-p1");
            if (reorder === true) {
                reorderElements(false);
            }
            break;
        case '2':
            todos[targetKey].priority = todoPriority;
            targetSpan.attr("class", "span_todo-text-p2");
            targetLi.attr("class", "list-item_todo-p2");
            if (reorder === true) {
                reorderElements(false);
            }
            break;
        case '3':
            todos[targetKey].priority = todoPriority;
            targetSpan.attr("class", "span_todo-text-p3");
            targetLi.attr("class", "list-item_todo-p3");
            if (reorder === true) {
                reorderElements(false);
            }
            break;
        default:
            alert("oops you bwoke it");
        }
        if (todos[targetKey].completed === true) {
            targetSelect.prop("disabled", true);
        } else {
            targetSelect.prop("disabled", false);
        }
        store();
    }

    // sets completed property - calling setPriority to assign priority value / class
    function setCompleted(targetKey, checked) {
        var todoPriority;
        if (todos[targetKey].completed === false && checked === true) {
            todos[targetKey].completed = true;
            todos[targetKey].prevPriority = todos[targetKey].priority;
            setPriority(targetKey, "-1", true);
        } else {
            if (todos[targetKey].completed === true && checked === false) {
                todos[targetKey].completed = false;
                todoPriority = todos[targetKey].prevPriority.toString();
                setPriority(targetKey, todoPriority, true);
            }
        }
        store();
    }

    // creates input field to edit to-do text
    function createEditInput(targetKey) {
        document.getElementById('spanText_' + targetKey).remove();
        var inputEdit =  document.createElement("input");
        inputEdit.type = "text";
        inputEdit.Id = 'inputEdit_' + targetKey;
        inputEdit.className = "inputEdit";
        inputEdit.dataset.key = targetKey;
        inputEdit.value = todos[targetKey].todoText;
        document.getElementById('listItem_' + targetKey).appendChild(inputEdit);
        inputEdit.focus();
    }

    // removes input field and saves text post edits to object, creates new text span
    function createEditSpan(targetKey, e) {
        todos[targetKey].todoText = e.target.value;
        console.log(e.target.value);
        e.target.remove();
        var spanText = document.createElement("span");
        spanText.dataset.key = targetKey;
        spanText.id = 'spanText_' + targetKey;
        spanText.textContent = todos[targetKey].todoText;
        document.getElementById('listItem_' + targetKey).appendChild(spanText);
        setPriority(targetKey, todos[targetKey].priority, false);
    }

    // function execution triggered by pressing enter on inputText field
    function initListeners() {
        $inputText.keyup(function (e) {
            var todo_key,
                itemText = $inputText.val();
            // if input text value is not undefined or one space, proceed on enter key
            if (undefined === itemText || itemText === "" || itemText === " ") {
                return false;
            }
            if (e.which === 13) {
                todoCounter += 1;
                todo_key = 'todo_' + todoCounter;
                createObject(todo_key, itemText);
                createElement(todo_key, false);
                $inputText.val("");
            }
        });
        // delete button event listener on click
        $todosUL.click(function (e) {
            var target = $(e.target);
            if (!target.is('button')) {
                target = target.parents('button');
            }
            if (target.hasClass('button_delete')) {
                console.log("del button clicked " + e.target.dataset.key);
                removeElements(e.target.dataset.key, false);
            }
        });
        // check box event listener on click
        $todosUL.click(function (e) {
            if (e.target.className === "checkbox") {
                console.log("checkbox clicked: " + e.target.dataset.key);
                setCompleted(e.target.dataset.key, e.target.checked);
            }
        });
        // select event listener on change
        $todosUL.change(function (e) {
            var target = $(e.target);
            if (target.hasClass('select')) {
                console.log("select clicked: " + e.target.dataset.key);
                setPriority(e.target.dataset.key, e.target.value, true);
            }
        });
        // span event listener on double click
        $todosUL.dblclick(function (e) {
            if (e.target.className === "span_todo-text-default" || e.target.className === "span_todo-text-p1" || e.target.className === "span_todo-text-p2" || e.target.className === "span_todo-text-p3") {
                console.log("spanText clicked: " + e.target.dataset.key);
                createEditInput(e.target.dataset.key);
            }
        });
        // input field event listener on keyup
        $todosUL.keyup(function (e) {
            if (e.which === 13 && e.target.className === "inputEdit") {
                e.target.blur();
            }
        });
        // input field event listener on focusout
        $todosUL.focusout(function (e) {
            if (e.target.className === "inputEdit") {
                createEditSpan(e.target.dataset.key, e);
            }
        });
        // automagically saves counter val and todos {} to localStorage on window close / refresh
        window.addEventListener("unload", function (e) {
            //store();
        });
    }

    function init() {
        var td;
        if (undefined !== localStorage.getItem("localCounter")) {
            todos = JSON.parse(localStorage.getItem("localTodos"));
            todoCounter = parseInt(localStorage.getItem("localCounter"));
        } else {
            console.log("no counter found or counter is 0");
            todoCounter = 0;
            todos = {};
        }
        if (undefined === todos || null === todos) {
            todos = {};
            todoCounter = 0;
        }
        reorderElements(false);
        initListeners();
    }


    /**
     * This is the master init() method, used to fire off the entire app (core,modules,themes,etc..)
     * We segregate out this function so the base "app" namespace can be extended as much as needed before
     * "appGlobal" extends it with a final, organized init() method.
     * @type {Object}
     */
    app.init = function () {
        init();
        console.log(app);
    };
    /**
     * return the final, organized app namespace with everything ready to init();
     */
    return app;

}(jQuery, window));

$('document').ready(function () {
    app.init();
});
