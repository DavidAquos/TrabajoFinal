const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/authjwt');

const adminAppCtrl = require('../controllers/adminapp.controller');

//Routes
router.post('/producto', async (req, res) => {await adminAppCtrl.createProducto(req, res);});
router.put('/producto/:id', async (req, res) => {await adminAppCtrl.editProducto(req, res);});
router.delete('/producto/:id',  async (req, res) => {await adminAppCtrl.deleteProducto(req, res);});


router.post('/cupon',  async (req, res) => {await adminAppCtrl.createCupon(req, res);});
router.put('/cupon/:id',  async (req, res) => {await adminAppCtrl.editProducto(req, res);});
router.delete('/cupon/:id',  async (req, res) => {await adminAppCtrl.deleteCupon(req, res);});


router.post('/social',  async (req, res) => {await adminAppCtrl.createSocial(req, res);});
router.delete('/social/:id',  async (req, res) => {await adminAppCtrl.deleteSocial(req, res);});
router.put('/social/:id',  async (req, res) => {await adminAppCtrl.editSocial(req, res);});


router.post('/promocion',  async (req, res) => {await adminAppCtrl.createPromocion(req, res);});
router.delete('/promocion/:id',  async (req, res) => {await adminAppCtrl.deletePromocion(req, res);});
router.put('/promocion/:id',  async (req, res) => {await adminAppCtrl.editPromocion(req, res);});


router.post('/usuario',  async (req, res) => {await adminAppCtrl.createUsuario(req, res);});
router.delete('/usuario/:id',  async (req, res) => {await adminAppCtrl.deleteUsuario(req, res);});
router.put('/usuario/:id',  async (req, res) => {await adminAppCtrl.editUsuario(req, res);});


// router.get('/private', async (req, res) => {res.status(200).json({ message: "Okey... Hi!" })});

module.exports = router;
