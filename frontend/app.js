//require('./styles/apps');
//Vamos a requirirlo con EMScIPRT 6

import './styles/app.css';
import Book from './models/Book.js';
import UI from './UI';


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
  });

// traemos el elemento del formulario id="book-form"
document.getElementById('book-form') //evento del boton enviar
    .addEventListener('submit', e => { //en este evento tenemos que introducir una funcion, recogiendo el id de los campos del formulario
        const title = document.getElementById('title').value;// capturamos el valor del title
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files; //"files", nos guarda el archivo que se subirá.
        //console.log(title,author,isbn,image);
        // capturamos con un formulario los contenido
        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('title',title);
        formData.append('author', title);
        formData.append('isbn',isbn);
        //Ahora enviamos con un servicio, el contenido 'POST
        //const bookService = new BookService(); UI, js
        //bookService.postBook(formData); UI.js

        // Instatiating the UI
        const ui = new UI();
         // New Book Object
        const book = new Book(title, author, isbn);

        // Validating User Input
        if (title === '' || author === '' || isbn === '') {
        ui.renderMessage('Please fill all the fields', 'warning', 3000);
        } else {
        // Pass the new book to the UI
        ui.addANewBook(formData);
        ui.renderMessage('New Book Added Successfully', 'success', 2000);
        }
        e.preventDefault();
        
    }); // el evento se llama submit "enviar" pero lo llamamos con addEvenListener

document.getElementById('books-cards') //evento 
    .addEventListener('click', e => {
      const ui = new UI();
      // captura el elemento que tenga como clase delete 
      if (e.target.classList.contains('delete')) {
          
        console.log(e.target.getAttribute('_id'));
          
        ui.deleteBook(e.target.getAttribute('_id'));
        ui.renderMessage('Book Deleted Successfully', 'danger', 3000);
      }
      e.preventDefault();
    });
