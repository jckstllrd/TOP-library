// Library array to store books
const myLibrary = [];

// Book constructor function
function Book(id, title, author, pages, hasRead) {
  this.ID = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead ? "read" : "not read yet";

  this.getInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`;
  };

  function toggleRead(read) {
    this.hasRead = read;
  }
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Book(crypto.randomUUID(), title, author, pages, hasRead);
  myLibrary.push(book);
  return book;
}

// DOM elements
const books = document.querySelector(".book-container");
const newBookBtn = document.querySelector(".new-book-btn");
const newBookFormCont = document.querySelector(".form-container");
const container = document.querySelector(".container");
const closeWinBtn = document.querySelector(".close-window-btn");
const addBookBtn = document.querySelector(".add-book-btn");

// Function to remove a book card from the DOM and library
function removeBookCard(bookID) {
  
  myLibrary.forEach((newBook) => {
    if (bookID === newBook.ID) {
      myLibrary.splice(myLibrary.indexOf(newBook), 1);
      return;
    }
  });

  const bookCard = books.querySelector(`[data-book-id="${bookID}"]`);
  if (bookCard) {
    bookCard.remove();
  }
}

// Function to create a book card and add it to the DOM
function createBookCard(book) {
  const template = document.getElementById("book-card-template");
  const bookCard = template.content.cloneNode(true);

  // Fill in the book details
  bookCard.querySelector(".title").textContent = book.title;
  bookCard.querySelector(".author").textContent = book.author;
  bookCard.querySelector(".pages").textContent = `${book.pages} pages`;
  bookCard.querySelector(".read-status").textContent = book.hasRead;


  const cardElement = bookCard.querySelector(".card")
  cardElement.setAttribute("data-book-id", book.ID);

  // Add the card to the container
  books.appendChild(bookCard);

  const deleteBtn = cardElement.querySelector('.delete')
  deleteBtn.addEventListener("click", () => {
    console.log("here");
    removeBookCard(book.ID)
  })
}

// Initialize the library with sample books
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("Cars", "Disney", 205, false);
addBookToLibrary("The Book Thief", "Suzanne Reed", 312, false);
addBookToLibrary("How to Cook Chiccy Caesar Salad", "Sonja Lowdon", 348, true);

// Render all books in the library
myLibrary.forEach((book) => {
  createBookCard(book);
});

// Event listener for opening the new book form
newBookBtn.addEventListener("click", () => {
  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});

// Event listener for closing the new book form
closeWinBtn.addEventListener("click", () => {
  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});

// Event listener for adding a new book
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = e.target.form.title.value;
  const author = e.target.form.author.value;
  const pages = e.target.form.pages.value;
  const read = e.target.form.read.checked;

  const book = addBookToLibrary(title, author, pages, read);
  createBookCard(book);

  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});

// // Event listeners for deleting books
// const deleteBooks = document.querySelectorAll(".delete");
// deleteBooks.forEach((deleteBtn) => {
//   deleteBtn.addEventListener("click", (e) => {
//     const bookId = e.target.ID.value;
//     removeBookCard(bookId);
//   });
// });
