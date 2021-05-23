const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/producto', async (req, res) => {eventAppCtrl.getProductos(req,res);});
router.get('/producto/:id', async (req, res) => {eventAppCtrl.getProducto(req,res);});


router.get('/cupon',  async (req, res) => {eventAppCtrl.getCupones(req,res);});
router.get('/cupon/:id',  async (req, res) => {eventAppCtrl.getCupon(req,res);});
router.get('/cuponcode/:code',  async (req, res) => {eventAppCtrl.getCuponByCode(req,res);});


router.get('/social/:id',  async (req, res) => {eventAppCtrl.getSocial(req,res);});
router.get('/social',  async (req, res) => {eventAppCtrl.getSociales(req,res);});


router.get('/promocion',  async (req, res) => {eventAppCtrl.getPromociones(req,res);});
router.get('/promocion/:id',  async (req, res) => {eventAppCtrl.getPromocion(req,res);});


router.post('/pedido',  async (req, res) => {await eventAppCtrl.createPedido(req, res);});
router.delete('/pedido/:id',  async (req, res) => {await eventAppCtrl.deletePedido(req, res);});
router.put('/pedido/:id',  async (req, res) => {await eventAppCtrl.editPedido(req, res);});
router.get('/pedido',  async (req, res) => {await eventAppCtrl.getOnePedido(req, res);});


router.put('/usuario/:id',  async (req, res) => {await eventAppCtrl.editUsuario(req, res);});
router.get('/usuario',  async (req, res) => {await eventAppCtrl.getUsuario(req, res);});

module.exports = router;
