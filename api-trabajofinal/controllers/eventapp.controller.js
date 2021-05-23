const Producto = require('../models/producto');
const Cupon = require('../models/cupon');
const Social = require('../models/redSocial');
const Promocion = require('../models/promocion');
const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');

const eventappCtrl = {};

//Get lista de productos
eventappCtrl.getProductos = async (req, res) => {
    const producto = await Producto.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(producto);
};

//Get lista de cupones
eventappCtrl.getCupones = async (req, res) => {
    const cupones = await Cupon.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(cupones);
};

//Get un producto por id
eventappCtrl.getProducto = async (req, res) => {
    try{
        const producto = await Producto.findById(req.params.id);
        if (producto == null){
            res.status(404).json({message: 'Product not found'});
        }
        res.status(201).json(producto);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

//Get un cupon por id (usar un metodo para consultar si se puede usar un cupon)
eventappCtrl.getCupon = async (req, res) => {
    try{
        const cupon = await Cupon.findById(req.params.id);
        if (cupon == null){
            res.status(404).json({message: 'Cupon not found'});
        }
        res.status(201).json(cupon);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.getCuponByCode = async (req, res) => {
    try{
        const cupon = await Cupon.findOne({nombre: req.params.code});
        if (cupon == null) {
            res.status(404).json({message: 'Cupon not found'});
        }

        res.status(201).json(cupon);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.getSocial = async (req, res) => {
    try{
        const social = await Social.findById(req.params.id);
        if (social == null){
            res.status(404).json({message: 'Social not found'});
        }
        res.status(201).json(social);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.getSociales = async (req, res) => {
    const social = await Social.find().catch((err) => {
        res.status(500).json({message: err.message})
    });
    res.json(social);
};

eventappCtrl.getPromocion = async (req, res) => {
    try{
        const promocion = await Promocion.findById(req.params.id);
        if (promocion == null){
            res.status(404).json({message: 'Promocion not found'});
        }
        res.status(201).json(promocion);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.getPromociones = async (req, res) => {
    const promocion = await Promocion.find().catch((err) => {
        res.status(500).json({message: err.message})
});
res.json(promocion);
};

eventappCtrl.createPedido = async (req, res) => {
    try{
        const pedido = new Pedido({
            entrega: req.body.entrega,
            servicio: req.body.servicio,
            envio: req.body.envio,
            precio_productos: req.body.precio_productos,
            descuento_codigo: req.body.descuento_codigo,
            total: req.body.total,
            metodo_pago: req.body.metodo_pago,
            nombre_productos: req.body.nombre_productos,
        });
        await pedido.save();
        res.status(201).json({message: 'Pedido creado'})
    }catch (e) {
        res.send(400).json({message: e.message});
    }
};

eventappCtrl.deletePedido = async (req, res) => {
    try{
        await Pedido.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Pedido deleted'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

eventappCtrl.editPedido = async (req, res) => {
    try{
        const pedido = {
            entrega: req.body.entrega,
            servicio: req.body.servicio,
            envio: req.body.envio,
            precio_productos: req.body.precio_productos,
            descuento_codigo: req.body.descuento_codigo,
            total: req.body.total,
            metodo_pago: req.body.metodo_pago,
            nombre_productos: req.body.nombre_productos,
        };
        await Pedido.findByIdAndUpdate(req.params.id,{$set: pedido}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Pedido updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

eventappCtrl.getOnePedido = async (req, res) => {
    try{
        const pedido = await Pedido.findOne();
        res.status(201).json(pedido);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.editUsuarioCupon = async (req, res) => {
    try{
        const usuario = {
            id_cupones: req.body.id_cupones,
            id_cupones_usado: req.body.id_cupones_usado,
        };
        await Usuario.findByIdAndUpdate(req.params.id,{$set: usuario}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Usuario updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

eventappCtrl.getUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findOne();
        res.status(201).json(usuario);
    }catch (e) {
        res.status(500).json({message: e.message});
    }
};

eventappCtrl.editUsuario = async (req, res) => {
    try{
        const usuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            num_telefono: req.body.num_telefono,
            correo: req.body.correo,
            pw: req.body.pw,
            direcciones: req.body.direcciones,
            datos_tarjeta: req.body.datos_tarjeta,
            nivel: req.body.nivel,
            id_cupones: req.body.id_cupones,
            id_cupones_usado: req.body.id_cupones_usado,
        };
        await Usuario.findByIdAndUpdate(req.params.id,{$set: usuario}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Usuario updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

module.exports = eventappCtrl;
