var app = (function () {
    var inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0; 
    //creates the todo items
    itsTimeToMakeTheDonuts = function (todo_key, itemText) {
    	todos[todo_key] = {};
    	todos[todo_key].key = todo_key;
    	todos[todo_key].listed = false;
    	todos[todo_key].priority = null;
    	todos[todo_key].todoText = itemText;
    };
    //adds elements to the markup / assigns matching key to each
    listTodos = function (todo_key, todoText, todos) {
    	var i, j, listing, priorityCheck, todoText;
        doTheThing = function () {

            //not sure if should I leave elements "anonymous" with key property
            //or if I can name each element dynamically with todo_key integer

        	//listItem
        	var listItem = document.createElement("li");
        	listItem.key = 'todo_'+todoCounter;
            //checkBox
            var checkBox = document.createElement("input")
            checkBox.type = "checkbox";
            checkBox.className = "checkbox";
            checkBox.key = todo_key;
            //span
            var span = document.createElement("span");
            span.key = todo_key;
            span.innerText = todos[todo_key].todoText;
            //place elements
            listItem.appendChild(checkBox);
            listItem.appendChild(span);
            todoList.appendChild(listItem);
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
    //function execution triggered by pressing enter in input field
    inputText.onkeyup = function (event){
            var todo_key, itemText = inputText.value, i, todoText;

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
    //do I even need to return this?
    //return {
    //listTodos: listTodos,
    //todos: todos
    //};
} ());
