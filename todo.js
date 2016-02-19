var app = (function () {
    var  targetKey, targetId, targetSpan, targetLi, targetSpan2, inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0, todoPriority = 0; 
    //creates the todo items
    itsTimeToMakeTheDonuts = function (todo_key, itemText) {
        todos[todo_key] = {};
        todos[todo_key].key = todo_key;
        todos[todo_key].listed = false;
        todos[todo_key].priority = null;
        todos[todo_key].todoText = itemText;
    };
    //adds elements to the markup / assigns matching key / id
    listTodos = function (todo_key, todoText, todos) {
        var i, j, listing, priorityCheck, todoText;

        doTheThing = function () {
            //listItem
            var listItem = document.createElement("li");
            listItem.dataset.key = todo_key;
            listItem.className = "list-item_default";
            listItem.id = "listItem_"+todo_key;
            //select
            var select = document.createElement("select");
            select.dataset.key = todo_key;
            select.className = "select";
            select.id = "select_"+todo_key;
            var selectOpt0 = document.createElement("option")
            selectOpt0.value = 0;
            selectOpt0.innerText = 0;
            selectOpt0.dataset.key = select.dataset.key
            var selectOpt1 = document.createElement("option")
            selectOpt1.innerText = 1;
            selectOpt1.dataset.key = select.dataset.key
            var selectOpt2 = document.createElement("option")
            selectOpt2.innerText = 2;
            selectOpt2.dataset.key = select.dataset.key
            var selectOpt3 = document.createElement("option")
            selectOpt3.innerText = 3;
            selectOpt3.dataset.key = select.dataset.key
            //delete button
            var delButton = document.createElement("button");
            delButton.dataset.key = todo_key;
            delButton.className = "button_delete";
            //completed checkbox
            var checkbox = document.createElement("input")
            checkbox.type = "checkbox";
            checkbox.dataset.key = todo_key;
            checkbox.className = "checkbox";
            //span for text
            var textSpan = document.createElement("span");
            textSpan.dataset.key = todo_key;
            textSpan.id = 'span_'+todo_key;
            textSpan.className = "span_todo-text-default";
            textSpan.innerText = todos[todo_key].todoText;
            console.log("span Id: "+textSpan.id);
            console.log("span className: "+textSpan.className);
            //place elements
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
        //lists prioritized todos first
        for (i = 1, j = todoCounter + 1; i < j; i++) {
            listing = todos['todo_'+i].listed;
            priorityCheck = todos['todo_'+i].priority;
            if (listing === false && priorityCheck !== null) {
                todos['todo_'+i].listed = true;
                doTheThing ();
            };
        };
        //list non prioritized todos second
        for (i = 1, j = todoCounter + 1; i < j; i++) {
            listing = todos['todo_'+i].listed;
            priorityCheck = todos['todo_'+i].priority;
            if (listing === false && priorityCheck === null) {
                todos['todo_'+i].listed = true;
                doTheThing ();
            };
        };
    };
    //changes css class of span / list items - call when priority changes
    casteSystem = function (targetKey, targetLi, targetSpan, targetSpan2, todoPriority){
        //changes priority of selected todo to value from select
        //null if value selected == 0
        switch (todoPriority) {
            case '0': 
                todos[targetKey].priority = null;
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
    //function execution triggered by pressing enter in input field
    inputText.onkeyup = function (event){
        var todo_key, itemText = inputText.value, i, todoText;
        //if not undefined or one space, proceeds on enter key
        if (undefined === itemText || itemText === "" || itemText === " ") {
            return false;
            }
            if (event.which === 13) {
                // to be added: if end counter is 0 add todo objects from local storage
                todoCounter += 1;
                todo_key = 'todo_' + todoCounter;
                itsTimeToMakeTheDonuts(todo_key, itemText);
                listTodos(todo_key, todoText, todos);
                document.getElementById("inputText").value = "";
        };
    };
    //todo list event listeners
    //delete button identity check
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for delete button
            if(e.target.className == "button_delete") {
                console.log("del button clicked "+e.target.dataset.key);
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
                    todoPriority = e.target.value,
                    targetSpan = document.getElementById('span_'+targetKey),
                    targetLi = document.getElementById('listItem_'+targetKey),
                    targetSpan2 = document.getElementById('span2_'+targetKey);
                casteSystem (targetKey, targetLi, targetSpan, targetSpan2, todoPriority)
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
