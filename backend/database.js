const mongoose = require('mongoose');

// con process.env , vamos ha recoger  datos del archivo .env , para esto
// en el index.js tenemos que declararlo, require('dotenv')
console.log(process.env.MONGODB_URI);
 

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));