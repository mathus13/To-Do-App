var inputText = document.getElementById("inputText");
    todos = {},
    todoCounter = 0,

inputText.onkeyup = function (event){
	var todo_key, itemText = inputText.value;
	function Todo(todoText, priority, key) {
    this.todoText = todoText;
    this.priority = priority;
    this.key = key;

    var listItem = document.createElement("li");
	listItem.innerText = todoText;
	todoList.appendChild(listItem);
}

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
}
