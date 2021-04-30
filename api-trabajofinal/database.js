const mongoose = require('mongoose');

const URI = 'mongodb+srv://root:root@trabajofinal.rpiuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.set('useFindAndModify', false);
mongoose.connect(URI).then(db => console.log('DB is connected')).catch(err => console.error(err));

module.exports = mongoose;
