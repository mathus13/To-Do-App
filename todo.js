var app = (function () {
    //input field for to do items
    var inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0, todoPriority = 0; 
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
            //dropDown
            var dropDown = document.createElement("select");
            dropDown.dataset.key = todo_key;
            dropDown.className = "dropDown";
            dropDown.id = "dropDown_"+todo_key;
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
            console.log("del button class = "+todo_key);
            console.log("also: "+delButton.dataset.key);
            //completed checkBox
            var checkBox = document.createElement("input")
            checkBox.type = "checkBox";
            checkBox.dataset.key = todo_key;
            checkBox.className = "checkBox";
            //span for text
            var textSpan = document.createElement("span");
            textSpan.dataset.key = todo_key;
            textSpan.className = "textSpan";
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
            return delButton.dataset.key, checkBox.dataset.key, dropDown.dataset.key;
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
    //todo list event listeners
    //delete button identity check
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for delete button
            if(e.target.className == "delButton") {
                console.log("del button clicked "+e.target.dataset.key);
            };
        });
    //check box identity check
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for checkBox
            if(e.target.className == "checkBox") {
                console.log("checkBox clicked: "+e.target.dataset.key);
            };
        });
    //drop down (select) identity check on cchange
    document.getElementById("todoList").addEventListener("change", function(e) {
            //on click for dropDown
            if(e.target.className == "dropDown") {
                console.log("dropDown clicked: "+e.target.dataset.key);
                console.log(e.target.id);
                console.log(e.target.value);
            };
        });    
    //span identity check on click
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for span
            if(e.target.className == "textSpan") {
                console.log("textSpan clicked: "+e.target.dataset.key);
            };
        }); 
} ());
