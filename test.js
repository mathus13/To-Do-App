//proof of concept for dynamic naming convention for objects

var todoArray = [];
var arrayLen = todoArray.length;

function todo(todoText, priority) {
	this.todoText = todoText;
	this.priority = priority;
};

var inputText = document.getElementById("inputText");


// here I'm testing dynamic naming schema for global objects
var dynamic = "Test"

window['dynStr'+dynamic] = "global dyanmic string";

console.log(dynStrTest);

window ['dynObj'+dynamic] = new todo("global dynamic object",false);

console.log(dynObjTest.todoText);



inputText.onkeyup = function(event){
if(itemText =="" || itemText == " "){
		return false;
		} else {
			if(event.which == 13) {
			var itemText = inputText.value;
			
			var todoNew = new todo(itemText, false);
			
			// here I'm testing dynamic naming schema for local objects

			window['secondDynStr'+dynamic] = "local dynamic string";

			console.log(secondDynStrTest);

			window ["secondDynObj"+dynamic] = new todo("local dyanmic object", false);

			console.log(secondDynObjTest.todoText);

			todoArray.push(todoNew);

			console.log(arrayLen);
			console.log(todoArray[0].todoText);
			console.log(todoArray[1].todoText);
			console.log(todoArray[2].todoText);
		}
	}
}
