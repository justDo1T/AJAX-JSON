(function AjaxJsonModule() {

'use strict'

const btn = document.getElementById('btn');
const animalContainer = document.getElementById('animal-info');
let pageCounter = 1;

btn.addEventListener('click', function() {
	let myRequest = new XMLHttpRequest();
	myRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
	// .onload is a .onreadystatechange with readyState == 4 (new feature suppoerted by all modern browsers)
	myRequest.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			// evaluating file from plain text to JSON readable
			let data = JSON.parse(this.responseText);
			addText(data);
		} else {
			console.log('We connected to the server, but it returned an error')
		}
	};
	// if .onload wasn't succesfull .onerror will occur
	myRequest.onerror = function() {
		console.log('Connection error');
	};
	myRequest.send();
	pageCounter++;
	if (pageCounter > 3) {
		btn.classList.add('hide-me');
	}
});

function addText(data) {
	let text = '';
	for (let i = 0; i < data.length; i++) {
		text += '<p>' + data[i].name + ' is a ' + data[i].species + ' that he likes to eat ';
		for (let ii = 0; ii < data[i].foods.likes.length; ii++) {
			if (ii === 0) {
				text += data[i].foods.likes[ii];
			} else {
				text += ' and ' + data[i].foods.likes[ii];
			}
		}
		text += '. ' + data[i].name + ' dislikes ';
		for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {
			if (ii === 0) {
				text += data[i].foods.dislikes[ii];
			} else {
				text += ' and ' + data[i].foods.dislikes[ii];
			}
		}
		text += '.</p>';
	}
	animalContainer.insertAdjacentHTML('beforeend', text);
}

})();
