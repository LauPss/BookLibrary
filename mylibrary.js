function Book(title, author, year, pages, read) {
	this.title = title
	this.author = author
	this.year = year
	this.pages = pages
	this.read = read
}

const bookSample1 = new Book("Dubliners", "J.Joyce", "1914", "284", "Read");
const bookSample2 = new Book ("The Metamorphosis", "F.Kafka", "1915", "297", "Not read");
const bookSample3 = new Book("The Colour of Magic", "T.Pratchett", "1983", "287", "Not read");
const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("read");
let readStatus = "";

const table = document.getElementById("table");

const checkStorage = () => {
	if(!localStorage.getItem("storedArray")) {
		myLibrary.push(bookSample1, bookSample2, bookSample3);
		console.log("meow");
	} else {
		loadStorage();
	}
}

const addBookToLibrary = () => {
	const newBook = new Book(titleInput.value, authorInput.value, yearInput.value, pagesInput.value, readStatus);
	myLibrary.push(newBook);
	let row = document.createElement("tr");
};

const clearFields = () => {
	titleInput.value = "";
	authorInput.value = "";
	yearInput.value = "";
	pagesInput.value = "";
	readCheckbox.checked = false;
}

const addButton = document.getElementById("addButton");
addButton.addEventListener("click", (e) => {
	if (titleInput.checkValidity() && authorInput.checkValidity() && yearInput.checkValidity() && pagesInput.checkValidity()) {
		clearTable();
		readStatus = readCheckbox.checked ? "Read" : "Not read" ;
		addBookToLibrary();
		createStorageArray();
		displayTable();
		clearFields();
	} else {
		alert("Please, compile all fields with appropriate values.");
	}
});

const clearTable = () => {
	for(let i = table.rows.length - 1; i > 0; i--){
		table.deleteRow(i);
	}
}

const displayTable = () => {
	clearTable();
	
	myLibrary.forEach((Book, index) => {
		let row = document.createElement("tr");
		row.dataset.indexNumber = index;
		
		Object.values(Book).forEach(val => {
			const cell = document.createElement("td");
			cell.innerText = val;
			row.appendChild(cell);
		});
		
		const actionCell = document.createElement("td");
		const changeStatusBtn = document.createElement("button");
		const removeButton = document.createElement("button");
		
		changeStatusBtn.addEventListener("click", (e) => {
			myLibrary[row.dataset.indexNumber].read = (myLibrary[row.dataset.indexNumber].read === "Read") ? "Not read" : "Read" ;
			createStorageArray();
			displayTable();
		});
		
		removeButton.addEventListener("click", (e) => {
			myLibrary.splice(row.dataset.indexNumber, 1);
			createStorageArray();
			displayTable();
		});
		
		changeStatusBtn.innerText = "Change status";
		removeButton.innerText = "Remove";
		
		changeStatusBtn.classList.add("changeStatus");
		removeButton.classList.add("remove");
		
		actionCell.appendChild(changeStatusBtn);
		actionCell.appendChild(removeButton);
		row.appendChild(actionCell);
		table.appendChild(row);
	});
}

const createStorageArray = () => {
	let storArray = [];
	myLibrary.forEach(Book => {
		let objString = `${Book.title} - ${Book.author} - ${Book.year} - ${Book.pages} - ${Book.read}`;
		storArray.push(objString);
	});
	let storageString = storArray.join("|");
	localStorage.setItem("storedArray", storageString);
}

function loadStorage() {
	let storageString = localStorage.getItem("storedArray");
	let storArray = storageString.split("|");
	storArray.forEach(objString => {
		let storedBook = new Book;
		const valueArray = objString.split(" - ");
		storedBook.title = valueArray[0];
		storedBook.author = valueArray[1];
		storedBook.year = valueArray[2];
		storedBook.pages = valueArray[3];
		storedBook.read = valueArray[4];
		myLibrary.push(storedBook);
	});
}

checkStorage();
displayTable();
