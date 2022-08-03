/* eslint max-classes-per-file: ["error", 2] */

const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const form = document.getElementById('book-form');
const bookSection = document.querySelector('.library');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Array of books
class BookCollection {
  constructor(books = []) {
    this.books = books;
  }

  // Get Books
  getBooks(){
    
  }

  // Add a book
  add(addBook) {
    this.books.push(addBook);
    this.display(addBook);
    this.remove();
    this.saveToLocalStorage();
    inputAuthor.value = '';
    inputTitle.value = '';
  }

  // Remove a book
  remove() {
    const removeBtn = document.querySelectorAll('.remove-book');
    removeBtn[removeBtn.length - 1].addEventListener('click', (e) => {
      this.removeFromCollection(e.target);
      bookSection.removeChild(e.target.parentNode);
    });
  }

  // Display book dynamically
  display(data) {
    if (this) {
      const div = document.createElement('div');
      div.classList.add('book-collection', 'bookdiv');
      div.innerHTML = `<h4>"${data.title}" by
                    ${data.author}</h4>
                    <button data-value="${data.title}-${data.author}" type="button" class ="remove-book">Remove</button></>`;
      bookSection.appendChild(div);
    }
  }

  removeFromCollection(data) {
    const arr = data.getAttribute('data-value').split('-');
    this.books = this.books.filter(
      (item) => item.title + item.author !== arr[0] + arr[1],
    );
    this.saveToLocalStorage();
  }

  // Saving To storage
  saveToLocalStorage() {
    localStorage.setItem('addBook', JSON.stringify({ bookColl: this.books }));
  }
}

const collect = new BookCollection();
if (localStorage.getItem('addBook')) {
  const localBooks = JSON.parse(localStorage.getItem('addBook'));
  localBooks.bookColl.forEach((item) => {
    collect.add(new Book(item.title, item.author));
  });
}

form.addEventListener('submit', (e) => {
 // prevents default behaviour of the form of submitting
    e.preventDefault();
  collect.add(new Book(inputTitle.value, inputAuthor.value));
});