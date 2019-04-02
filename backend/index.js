
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
    console.log(process.env.NODE_ENV);
}


const express = require('express');
const morgan = require('morgan'); // con este veremos por consola las peticiones de los clientes.
const multer = require('multer');
const path = require('path'); // modulo de node, para que navegues sobre el proyecto. 
const cors = require('cors');
//***** */Initializations
const app = express();
require('./database')

// **** Setting - Definimos una variable con valor 300
    app.set('port', process.env.PORT || 3000);

// ***** Middlewares
    app.use(morgan('dev'));

    //para ejecutar multer , antes tenemos que configurarlo.
    const storage = multer.diskStorage({
        //Con este objeto de multer 'DiskStorage' , colocar imagen
       // destination: 'public/uplodas' , añadimos path para que pueda recoger la carpeta upload    
        destination: path.join(__dirname, 'public/uploads'),
        filename(req, file, cb){
            cb(null, new Date().getTime()+ path.extname(file.originalname));
        }

    })
    // single es para subir solo una imagen , image es del front end
    app.use(multer({storage}).single('image'));
    // con esto interpretamos los datos del formulario 
    app.use(express.urlencoded({extended: false}));
    // con esto interpretamos el JSON enviados y recibidos
    app.use(express.json());

    // CORS
    app.use(cors())

    // Routes
    app.use('/api/books',require('./routes/books'));

    // Static Files 
    // Vamos a habilitar la carpeta public, con método static para enviar archivos staticos(imagenes, fuentes, css), 
    app.use(express.static(path.join(__dirname, 'public')));

// ***** Start the server, asignamos la variable y agregamos una function
app.listen(app.get('port'),()=>{
    //Uno vez que inicia el servidor en el puerto 3000
    console.log('Server on port ',app.get('port'));
    //Con esto ya tenemos un servidor 
})
