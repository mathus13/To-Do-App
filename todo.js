var app = (function () {
    var  targetKey, targetId, targetSpan, targetLi, targetDiv, inputText = document.getElementById("inputText"), todos = {}, todoCounter = 0, todoPriority = 0; 
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
            listItem.className = "listItem_Default";
            listItem.id = "listItem_"+todo_key;
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
            delButton.className = "button_Delete";
            //completed checkBox
            var checkBox = document.createElement("input")
            checkBox.type = "checkBox";
            checkBox.dataset.key = todo_key;
            checkBox.className = "checkBox";
            //span for text
            var textSpan = document.createElement("span");
            textSpan.dataset.key = todo_key;
            textSpan.id = 'span_'+todo_key;
            textSpan.className = "textSpan_Default";
            textSpan.innerText = todos[todo_key].todoText;
            console.log("span Id: "+textSpan.id);
            console.log("span className: "+textSpan.className);
            //div for gradient background
            var postTextDiv = document.createElement("div");
            postTextDiv.dataset.key = todo_key;
            postTextDiv.id = 'div_'+todo_key;
            postTextDiv.className = "div_LiGradient_Default";
            //place elements
            todoList.appendChild(listItem);
            listItem.appendChild(delButton);
            listItem.appendChild(checkBox);
            listItem.appendChild(dropDown);
            dropDown.appendChild(dropDownOpt0);
            dropDown.appendChild(dropDownOpt1);
            dropDown.appendChild(dropDownOpt2);
            dropDown.appendChild(dropDownOpt3);
            listItem.appendChild(textSpan);
            textSpan.appendChild(postTextDiv);
            return delButton.dataset.key, checkBox.dataset.key, dropDown.dataset.key, textSpan.dataset.key;
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
    casteSystem = function (targetDiv, targetKey, targetLi, targetSpan, todoPriority){
        //changes priority of selected todo to value from dropDown
        //null if value selected == 0
        switch (todoPriority) {
            case '0': 
                todos[targetKey].priority = null;
                targetSpan.className = "textSpan_Default";
                targetLi.className = "listItem_Default";
                //targetDiv.className = "div_LiGradient_Default";
                break;
            case '1':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "textSpan_P1";
                targetLi.className = "listItem_P1";
                //targetDiv.className = "div_LiGradient_P1";
                break;
            case '2':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "textSpan_P2";
                targetLi.className = "listItem_P2";
                //targetDiv.className = "div_LiGradient_P2";
                break;
            case '3':
                todos[targetKey].priority = todoPriority;
                targetSpan.className = "textSpan_P3";
                targetLi.className = "listItem_P3";
                //targetDiv.className = "div_LiGradient_P3";
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
            if(e.target.className == "button_Delete") {
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
    //drop down (select) identity check on change
    document.getElementById("todoList").addEventListener("change", function(e) {
            //on click for dropDown
            if(e.target.className == "dropDown") {
                console.log("dropDown clicked: "+e.target.dataset.key);
                var targetKey = e.target.dataset.key,
                    todoPriority = e.target.value,
                    targetSpan = document.getElementById('span_'+targetKey),
                    targetLi = document.getElementById('listItem_'+targetKey),
                    targetDiv = document.getElementById('div_'+targetKey);
                casteSystem (targetDiv, targetKey, targetLi, targetSpan, todoPriority)            };
        });    
    //span identity check on click
    document.getElementById("todoList").addEventListener("click", function(e) {
            //on click for span
            if(e.target.className == "textSpan_Default" || e.target.className == "textSpan_P1" || e.target.className == "textSpan_P2" || e.target.className == "textSpan_P3") {
                console.log("textSpan clicked: "+e.target.dataset.key);
            };
        }); 
} ());
