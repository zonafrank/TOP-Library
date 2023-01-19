const seed = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    read: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 272,
    read: false
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 227,
    read: false
  }
];

let myLibrary = [];
let showForm = false;

const form = document.getElementById("form");
const formVisible = form.classList.contains("show");
const showHideFormBtn = document.getElementById("show-hide-form");
form.addEventListener("submit", submitForm);
showHideFormBtn.addEventListener("click", showHideForm);

for (let item of seed) {
  const { title, author, pages, read } = item;
  const book = addBookToLibrary(title, author, pages, read);
}

function getNextId() {
  const ids = myLibrary.map((b) => b.id);
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (ids.includes(id));
  return id;
}

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = getNextId();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  const bookTable = document.getElementById("books");
  const tableBody = bookTable.querySelector("tbody");
  tableBody.innerHTML = "";

  for (let book of myLibrary) {
    // create a row
    const row = document.createElement("tr");
    // create column for book title
    const titleCol = document.createElement("td");
    // create element for title text
    const bookTitleText = document.createElement("span");
    bookTitleText.classList.add("book-title-text");
    bookTitleText.textContent = book.title;
    titleCol.appendChild(bookTitleText);
    titleCol.classList.add("book-title");
    // create element for book delete icon
    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-btn");
    deleteIcon.dataset.bookId = book.id;
    deleteIcon.addEventListener("click", deleteBook);
    deleteIcon.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';
    titleCol.append(deleteIcon);
    const authorCol = document.createElement("td");
    authorCol.innerText = book.author;
    const pagesCol = document.createElement("td");
    pagesCol.innerText = book.pages;
    const readCol = document.createElement("td");
    const readColText = document.createElement("span");
    readColText.classList.add("read-status-text");
    readColText.dataset.bookId = book.id;
    readColText.innerText = book.read ? "read" : "not read";
    readColText.addEventListener("click", toggleReadStatus);
    readColText.setAttribute("title", "click to toggle read status");
    readCol.appendChild(readColText);
    readCol.classList.add("read-status");

    // append cells to the row
    row.appendChild(titleCol);
    row.appendChild(authorCol);
    row.appendChild(pagesCol);
    row.appendChild(readCol);
    // append row to the table body
    tableBody.appendChild(row);
  }
}

function toggleReadStatus(e) {
  const { target } = e;
  const bookId = target.dataset.bookId;
  myLibrary = myLibrary.map((b) => {
    if (b.id == bookId) {
      return { ...b, read: !b.read };
    } else {
      return b;
    }
  });
  displayBooks();
}

function deleteBook(e) {
  const parentElem = e.target.parentElement;
  const bookId = parentElem.dataset.bookId;
  const closestTd = parentElem.closest("td");
  // console.log(closestTd);
  const bookTitleElem = closestTd.querySelector("span.book-title-text");
  const bookTitle = bookTitleElem.textContent;

  const confirmDelete = window.confirm(
    `Delete book ${bookTitleElem.textContent}?`
  );

  if (!confirmDelete) return;

  myLibrary = myLibrary.filter((b) => b.id != bookId);
  displayBooks();
}

function submitForm(e) {
  e.preventDefault();
  const { elements } = e.target;
  const title = elements.title.value;
  const author = elements.author.value;
  const pages = Number(elements.pages.value);
  const read = elements.read.value === "true" ? true : false;

  addBookToLibrary(title, author, pages, read);
  e.target.reset();
  displayBooks();
}

function showHideForm(e) {
  if (form.classList.contains("hide")) {
    form.classList.remove("hide");
    form.classList.add("show");
    showHideFormBtn.textContent = "hide form";
  } else {
    form.classList.remove("show");
    form.classList.add("hide");
    showHideFormBtn.textContent = "show form";
  }
}

displayBooks();
