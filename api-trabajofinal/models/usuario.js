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
    id_cupones: [String],
    id_cupones_usado: [String],
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
