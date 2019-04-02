// Es una clase que se va a reautilizar cuantas veces quieras
class BookService{

    constructor(){
        //this.URI = 'http://192.168.0.33:3000/api/books'; Desarollo
        this.URI = '/api/books';
    }

    async getBooks(){ // Un peticion Get a tu backend "URI"
    //Esta petiión esta consultando otro servidor 
    const response = await fetch(this.URI); 
    // lo convertimos en JSON 
    const books = await response.json();
    return books;
    }

    async postBook(book){
        const response = await fetch(this.URI, {
            method: 'POST',
            body : book
        })
        const data = await response.json();
        console.log(data);
        
    }

    async deleteBook(bookId){
        const res= await fetch (`${this.URI}/${bookId} `, {
            headers: {
                'Content-Type': 'application/json'
            },
            method:'Delete'
        });
        const data = await res.json();
        console.log(data);
        
    }

}

//module.exports = BookService;
export default BookService;