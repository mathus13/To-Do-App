var inputText = document.getElementById("inputText"),
    todos = {},
    todoCounter = 0,
    endCounter = 0

listTodos = function () {
  //lines 29 - 31 go here to keep it DRY
  //for loop will run and call this function for priority first
  //then run again for non priorities
}

inputText.onkeyup = function (event){
	var todo_key, itemText = inputText.value, i, todoText

  	if (undefined === itemText || itemText === "" || itemText === " ") {
 		return false;
    	}
    	if (event.which === 13) {
    		    //if end counter is 0 add total objects from local storage
            todoCounter = todoCounter + 1;
            endCounter = endCounter + 1;
            todo_key = 'todo_' + todoCounter; 
            console.log(todo_key);
            todos[todo_key] = {};
            todos[todo_key].key = todo_key;
            todos[todo_key].listed = false;
            todos[todo_key].todoText = itemText;
            
                //for (i)
                //for in loop if listed = false && priority !null {
                var listItem = document.createElement("li");
	            listItem.innerText = todos[todo_key].todoText;
	            todoList.appendChild(listItem);
	            //todos[todo_key].listed = true;
            document.getElementById("inputText").value = "";
    }
};
