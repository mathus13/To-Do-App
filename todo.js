var app = (function () {
    //input field for to do items
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
        	//listItem
        	var listItem = document.createElement("li");
        	listItem.dataset.key = todo_key;
            //dropdown
            var dropDown = document.createElement("select");
            dropDown.dataset.key = todo_key;
            dropDown.className = "dropdown";
            // ?? dropDown.id = "dropDown";
            var dropDownOpt0 = document.createElement("option")
            dropDownOpt0.value = 0;
            dropDownOpt0.innerText = 0;
            dropDownOpt0.dataset.key = dropDown.dataset.key
            var dropDownOpt1 = document.createElement("option")
            dropDownOpt1.innerText = 1;
            dropDownOpt1.dataset.key = dropDown.dataset.key
            var dropDownOpt2 = document.createElement("option")
            dropDownOpt2.innerText = 2;
            dropDownOpt2.dataset.key = dropDown.dataset.key
            var dropDownOpt3 = document.createElement("option")
            dropDownOpt3.innerText = 3;
            dropDownOpt3.dataset.key = dropDown.dataset.key
            //delete button
            var delButton = document.createElement("button");
            delButton.dataset.key = todo_key;
            delButton.className = "delButton";
            //completed checkBox
            var checkBox = document.createElement("input")
            checkBox.type = "checkbox";
            checkBox.key = todo_key;
            checkBox.className = "checkbox";
            //span for text
            var textSpan = document.createElement("span");
            textSpan.dataset.key = todo_key;
            textSpan.className = "textspan";
            textSpan.innerText = todos[todo_key].todoText;
            //place elements
            todoList.appendChild(listItem);
            listItem.appendChild(delButton);
            listItem.appendChild(checkBox);
            listItem.appendChild(textSpan);
            listItem.appendChild(dropDown);
            dropDown.appendChild(dropDownOpt0);
            dropDown.appendChild(dropDownOpt1);
            dropDown.appendChild(dropDownOpt2);
            dropDown.appendChild(dropDownOpt3);
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
    //do I even need to return this?
    //return {
    //listTodos: listTodos,
    //todos: todos
    //};
} ());
