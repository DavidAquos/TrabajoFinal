const Producto = require('../models/producto');
const Cupon = require('../models/cupon');
const Social = require('../models/redSocial');

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

//Get un cupon por id
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

eventappCtrl.getSocial = async (req, res) => {
    try{
        const social = await Social.findById(req.params.id);
        if (social == null){
            res.status(404).json({message: 'Cupon not found'});
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

module.exports = eventappCtrl;
