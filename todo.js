var todoArray = [];
var arrayLen = todoArray.length;
var todoCounter = 0;

function todo(todoText, priority) {
	this.todoText = todoText;
	this.priority = priority;
};

var inputText = document.getElementById("inputText");


inputText.onkeyup = function(event){

	if(itemText =="" || itemText == " "){
	return false;
	} else {
		if(event.which == 13) {
		var itemText = inputText.value;
		
		alert("before: "+todoCounter);
		todoCounter = todoCounter+1;

		window['todo'+todoCounter] = new todo(itemText, false);


		console.log(todoCounter);
		alert(todoCounter);


		if ('undefined' !== todo1) {
		console.log(todo1.todoText);
		}


		}
	}

}
