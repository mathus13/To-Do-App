var app = (function () {

    var inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0, endCounter = 0;

    inputText.onkeyup = function (event){
            var todo_key, itemText = inputText.value, i, todoText;

        listTodos = function () {
            var listItem = document.createElement("li");
            listItem.innerText = todos[todo_key].todoText;
            todoList.appendChild(listItem);
        };

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
                listTodos();
                    //for (i)
                    //for in loop if listed = false && priority !null {

                document.getElementById("inputText").value = "";
        };
        return {
            listTodos: listTodos
        };
    };
} ());
