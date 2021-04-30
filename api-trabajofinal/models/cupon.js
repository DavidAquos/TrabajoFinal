const mongoose = require('mongoose');
const {Schema} = mongoose;

const CuponSchema = new Schema({
    nombre: String,
    descuento: Number,
    caducidad: String,
});

module.exports = mongoose.model('Cupon', CuponSchema);
