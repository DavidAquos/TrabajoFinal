const Producto = require('../models/producto');
const Cupon = require('../models/cupon');
const Pedido = require('../models/pedido');
const Promocion = require('../models/promocion');
const Usuario = require('../models/usuario');

const adminappCtrl = {};

adminappCtrl.createProducto = async (req, res) => {
    try{
        const producto = new Producto({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            img: req.body.img,
        });
        await producto.save();
        res.status(201).json({message: 'Producto creado'})
    }catch (e) {
        res.send(400).json({message: e.message});
    }
};

adminappCtrl.editProducto = async (req, res) => {
    try{
        const producto = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            img: req.body.img,
        };
        await Producto.findByIdAndUpdate(req.params.id,{$set: producto}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Producto updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.deleteProducto = async (req, res) => {
    try{
        await Producto.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Producto deleted'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.createCupon = async (req, res) => {
    try{
        const cupon = new Cupon({
            nombre: req.body.nombre,
            descuento: req.body.descuento,
            caducidad: req.body.caducidad,
        });
        await cupon.save();
        res.status(201).json({message: 'Cupon creado'})
    }catch (e) {
        res.send(400).json({message: e.message});
    }
};

adminappCtrl.editCupon = async (req, res) => {
    try{
        const cupon = {
            nombre: req.body.nombre,
            descuento: req.body.descuento,
            caducidad: req.body.caducidad,
        };
        await Producto.findByIdAndUpdate(req.params.id,{$set: cupon}, {new:true, useFindAndModify:false});
        res.status(201).json({message: 'Cupon updated'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

adminappCtrl.deleteCupon = async (req, res) => {
    try{
        await Cupon.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Cupon deleted'});
    }catch (e) {
        res.status(400).json({message: e.message});
    }
};

module.exports = adminappCtrl;
