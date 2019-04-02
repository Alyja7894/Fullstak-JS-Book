
import BookService from './services/BookService';
import { format } from 'timeago.js' ; 
const bookService = new BookService();

class UI {

    // método que pinta todo por pantalla , muestra los libro por pantalla
    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach((book) => {
          const div = document.createElement('div');
          div.className = 'animated fadeInRight';
          div.innerHTML = `
          <div class="card m-2">
            <div class="row no-gutters">
                <div class="col-md-4">
                <!-- <img src="http://192.168.0.33:3000${book.imagePath}" class="img-fluid" alt=""> Desarrollo -->
                <img src="${book.imagePath}" class="img-fluid" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                    </div>
                </div>
            </div>
            <div class="card-footer w-100 text-muted">
              ${format(book.created_at)}
            </div>
          </div>
          `;
          booksCardContainer.appendChild(div);
        });
      }

    async addANewBook(book) {
        await bookService.postBook(book);
        
        this.renderBooks();
        this.clearBookForm();
    }
    clearBookForm() {
        document.getElementById('book-form').reset();
        document.getElementById('title').focus();
    }
    // creamos un elemento div , es un mensaje con color y segundos.
    renderMessage(message, colorMessage, secondsToRemove){
        // Creating a div
        const div = document.createElement('div');
        // Styling the div - color del mensale 
        // div.className = `message ${colorMessage}`;
        div.className = `alert alert-${colorMessage} message`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds , se ejecuta pasados algunos segundos
        setTimeout(() => {
        document.querySelector('.message').remove();
        }, secondsToRemove);

    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();

    }

}

export default UI;
