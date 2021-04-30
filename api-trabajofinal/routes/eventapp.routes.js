const express = require('express');
const router = express.Router();

const eventAppCtrl = require('../controllers/eventapp.controller');

//Routes
router.get('/producto', async (req, res) => {eventAppCtrl.getProductos(req,res);});
router.get('/producto/:id', async (req, res) => {eventAppCtrl.getProducto(req,res);});
router.get('/cupon',  async (req, res) => {eventAppCtrl.getCupones(req,res);});
router.get('/cupon/:id',  async (req, res) => {eventAppCtrl.getCupon(req,res);});

module.exports = router;
