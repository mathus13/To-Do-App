var app = (function () {

    var inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0, endCounter = 0; 

    itsTimeToMakeTheDonuts = function (todo_key, itemText) {
    	todos[todo_key] = {};
    	todos[todo_key].key = todo_key;
    	todos[todo_key].listed = false;
    	todos[todo_key].priority = null;
    	todos[todo_key].todoText = itemText;
        endCounter += 1;
    };

    listTodos = function (todo_key, todoText, todos) {
    	var i, j, listing, priorityCheck;

        doTheThing = function () {
        	var listItem = document.createElement("li");
                listItem.innerText = todos[todo_key].todoText;
                todoList.appendChild(listItem);
        };

        for (i = 1, j = endCounter + 1; i < j; i++) {
        	listing = todos['todo_'+i].listed;
        	priorityCheck = todos['todo_'+i].priority;
        	    
        	if (listing === false && priorityCheck !== null) {
        	    todos['todo_'+i].listed = true;
                doTheThing ();
            };
            
        };
        
        for (i = 1, j = endCounter + 1; i < j; i++) {
        	listing = todos['todo_'+i].listed;
        	priorityCheck = todos['todo_'+i].priority;
        	    
        	if (listing === false && priorityCheck === null) {
        	    todos['todo_'+i].listed = true;
                doTheThing ();
            };
            
        };
    };

    inputText.onkeyup = function (event){
            var todo_key, itemText = inputText.value, i, todoText;

  	    if (undefined === itemText || itemText === "" || itemText === " ") {
            return false;
    	    }
    	    if (event.which === 13) {
    		    //if end counter is 0 add total objects from local storage
                todoCounter = todoCounter + 1;
                todo_key = 'todo_' + todoCounter; 
                console.log(todo_key);
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
