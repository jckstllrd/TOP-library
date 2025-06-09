const myLibrary = [];

function Book(id, title, author, pages, hasRead) {
  this.ID = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (hasRead) {
    this.hasRead = "read";
  } else {
    this.hasRead = "not read yet";
  }

  this.getInfo = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.hasRead
    );
  };
}

function addBookToLibrary(title, author, pages, hasRead) {
  let book = new Book(crypto.randomUUID(), title, author, pages, hasRead);
  myLibrary.push(book);
  return book;
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
addBookToLibrary("Cars", "Disney", 205, false);
addBookToLibrary("The Book Thief", "Suzanne Reed", 312, false);
addBookToLibrary("How to Cook Chiccy Caesar Salad", "Sonja Lowdon", 348, true);

let books = document.querySelector(".book-container");

function createBookCard(book) {
  const template = document.getElementById("book-card-template");
  const bookCard = template.content.cloneNode(true);

  // Fill in the book details
  bookCard.querySelector(".title").textContent = book.title;
  bookCard.querySelector(".author").textContent = book.author;
  bookCard.querySelector(".pages").textContent = `${book.pages} pages`;
  bookCard.querySelector(".read-status").textContent = book.hasRead;

  // Add the card to the container
  books.appendChild(bookCard);
}

myLibrary.forEach((book) => {
  createBookCard(book);
});

const newBookBtn = document.querySelector(".new-book-btn");
const newBookFormCont = document.querySelector(".form-container");
const container = document.querySelector(".container");

newBookBtn.addEventListener("click", () => {
  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});

let closeWinBtn = document.querySelector(".close-window-btn");
closeWinBtn.addEventListener("click", () => {
  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});

const addBookBtn = document.querySelector(".add-book-btn");
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.form.pages);

  let title = e.target.form.title.value;
  let author = e.target.form.author.value;
  let pages = e.target.form.pages.value;
  let read = e.target.form.read.checked;
  console.log(read);
  let book = addBookToLibrary(title, author, pages, read);
  createBookCard(book);
  newBookFormCont.classList.toggle("hidden");
  container.classList.toggle("blur");
});
