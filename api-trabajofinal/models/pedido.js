const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    entrega: Number,
    servicio: Number,
    envio: Number,
    precio_productos: Number,
    descuento_codigo: Number,
    total: Number,
    metodo_pago: String,
});

module.exports = mongoose.model('Pedido', PedidoSchema);
