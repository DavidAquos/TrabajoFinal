const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/producto', async (req, res) => {eventAppCtrl.getProductos(req,res);});
router.get('/producto/:id', async (req, res) => {eventAppCtrl.getProducto(req,res);});


router.get('/cupon',  async (req, res) => {eventAppCtrl.getCupones(req,res);});
router.get('/cupon/:id',  async (req, res) => {eventAppCtrl.getCupon(req,res);});


router.get('/social/:id',  async (req, res) => {eventAppCtrl.getSocial(req,res);});
router.get('/social',  async (req, res) => {eventAppCtrl.getSociales(req,res);});


router.get('/promocion',  async (req, res) => {eventAppCtrl.getPromociones(req,res);});
router.get('/promocion/:id',  async (req, res) => {eventAppCtrl.getPromocion(req,res);});

module.exports = router;
