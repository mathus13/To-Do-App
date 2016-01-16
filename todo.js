var inputText = document.getElementById("inputText"),
    todos = {},
    todoCounter = 0,
    Todo = function (todoText, priority, key) {
        var listItem = document.createElement("li");
	    listItem.innerText = todoText;
	    todoList.appendChild(listItem);
    }

inputText.onkeyup = function (event){
	var todo_key, itemText = inputText.value;

  	if (undefined === itemText || itemText === "" || itemText === " ") {
 		return false;
    	}
    	if (event.which === 13) {
            todoCounter = todoCounter + 1;
            todo_key = 'todo_' + todoCounter;          
            //todos[todo_key].key = todo_key;
            todos[todo_key] = new Todo(itemText, false, todo_key);
                      
            document.getElementById("inputText").blur();
            document.getElementById("inputText").value = "";
    }
};
