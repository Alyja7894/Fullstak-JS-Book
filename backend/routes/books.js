const { Router }= require('express')
const router = Router();
const fs = require('fs-extra'); // fs no soporta promesas, fs-extra si soporta 
//traemos el modelo de los libros en uns constante
const Book = require('../models/Book')
const path = require('path'); //para navegar por mi proyecto 'resolve'
//router.get('/',(req,res) => res.send('Hello world')); enviando text
// enviado JSON
//router.get('/',(req,res) => res.send({text: 'Hello world'}));
/*
    async await
    Estamos consultando la base de datos(Book.find()) de los libros,
    una vez almacenado lo vamos a guardar en una constante.
    Ahor respondemos al clientes con res
*/  
router.get('/',async (req,res) => {
    // find busca todos los libro de la base de dato
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    //console.log(req.body);
    // Desde request.body , vamos a extraer los datos y almacenamos en una variable
    const{ title, author, isbn} = req.body;
    const imagePath = '/uploads/'+req.file.filename;

    const newBook = new Book({ title, author, isbn,imagePath})
    console.log(newBook);
    // guardamos como un evento asyncrono , por es o ponemos await
    await newBook.save();
    res.json({message : 'Libro guardado'})

    //res.send('recived');
    
})


router.delete('/:id', async (req, res) => {
    // mostramos el Id del libro 
    //console.log(req.params.id);
    
    const book = await Book.findByIdAndDelete(req.params.id);
    fs.unlink(path.resolve('./backend/public'+ book.imagePath))

   //enviamos un mensaje de confirmación de la eliminación
    res.json({message: 'Book Deleted'}) 
})

module.exports= router;







