const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({
    nombre: String,
    apellidos: String,
    num_telefono: Number,
    correo: String,
    pw: String,
    direcciones: [String],
    datos_tarjeta: String,
    nivel: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
