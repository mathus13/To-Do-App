var app = (function () {

    var inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0;
    // uncomment when needed: endCounter = 0; 

    doTheThing = function (todo_key, itemText) {
    	todos[todo_key] = {};
    	todos[todo_key].key = todo_key;
    	//un-comment once loop is active, not needed atm
    	//todos[todo_key].listed = false;
    	todos[todo_key].todoText = itemText;
    };

    listTodos = function (todo_key, todoText) {
        var listItem = document.createElement("li");
        listItem.innerText = todos[todo_key].todoText;
        todoList.appendChild(listItem);
    };

    inputText.onkeyup = function (event){
            var todo_key, itemText = inputText.value, i, todoText;

  	    if (undefined === itemText || itemText === "" || itemText === " ") {
            return false;
    	    }
    	    if (event.which === 13) {
    		    //if end counter is 0 add total objects from local storage
                todoCounter = todoCounter + 1;
                //uncomment when needed: endCounter = endCounter + 1;
                todo_key = 'todo_' + todoCounter; 
                console.log(todo_key);
                doTheThing(todo_key, itemText);
                listTodos(todo_key, todoText);
                    //for (i)
                    //for in loop if listed = false && priority !null {

                document.getElementById("inputText").value = "";
        };
    };
    //do I even need to return this?
    //return {
    //listTodos: listTodos,
    //todos: todos
    //};
} ());
