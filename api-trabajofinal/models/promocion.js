const mongoose = require('mongoose');
const {Schema} = mongoose;

const PromocionSchema = new Schema({
    nombre: String,
    descripcion: String,
    img: String,
});

module.exports = mongoose.model('Promocion', PromocionSchema);
