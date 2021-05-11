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
const myLibrary = [bookSample1, bookSample2, bookSample3];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("read");
let readStatus = "";

const table = document.getElementById("table");

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
	clearTable();
	readStatus = readCheckbox.checked ? "Read" : "Not read" ;
	addBookToLibrary();
	displayTable();
	clearFields();
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
			displayTable();
		});
		
		removeButton.addEventListener("click", (e) => {
			myLibrary.splice(row.dataset.indexNumber, 1);
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

displayTable();
