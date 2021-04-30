const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    codigo: String,
    img: String,
});

module.exports = mongoose.model('Producto', ProductoSchema);
