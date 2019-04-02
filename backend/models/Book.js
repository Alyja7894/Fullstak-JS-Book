// Solo vamos a requerir de mongosse  unos métodos ,(model y Schema)
const {Schema, model} = require('mongoose');


const BookSchema= new Schema({
    title: { type: String, required:true},
    author: { type: String, required:true},
    isbn: { type: String, required:true},  // un Id para casa libro
    imagePath: { type: String},
    created_at: { type: Date, default: Date.now} //created at: creado en, fecha de creación
}); // las imagenes no lo guardamos en la base de datos, lo guardamos en otro sitio.


//Lo exportamos
module.exports  = model('Book', BookSchema);
