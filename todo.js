// item html : 		 <li><input type="checkbox" /> <span> Item One </span></li>

function addNewItem(list, itemText) {
	var listItem = document.createElement("li");
	listItem.innerText = itemText;

	list.appendChild(listItem);
};

// var addButton = document.getElementById("addButton");

var inputText = document.getElementById("inputText");

// inputText.focus();

inputText.onkeyup = function(event) {

	// proceed on key press ENTER
	if (event.which == 13) {	

		var itemText = inputText.value;

		if(!itemText || itemText == "" || itemText == " "){
		return false;
	}

	addNewItem(document.getElementById("todoList"), itemText);
	
	// clears input 

	document.getElementById("inputText").blur();
	document.getElementById("inputText").value = "";
	
	}
};
