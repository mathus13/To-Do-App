var todoArray = [];
var arrayLen = todoArray.length;

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
			
			var todoNew = new todo(itemText, false);
			
			todoArray.push(todoNew);

			console.log(arrayLen);
			console.log(todoArray[0].todoText);
			console.log(todoArray[1].todoText);
			console.log(todoArray[2].todoText);
		}
	}
}
