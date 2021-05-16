const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authCtrl = {};

authCtrl.singin = async (req, res) =>{
    const userfound = await User.findOne({ email: req.body.email });
    if (userfound == null) return res.status(401).json({ message: "Email o contraseña incorrectas" });
    if(!await Usuario.checkPassword(req.body.password, userfound.password)) {
        res.status(401).json({ message: "Email o contraseña incorrectas" });
    }
    const token = jwt.sign({id: userfound._id}, config.SECRET, {
        expiresIn: 86400
    });
    res.status(200).json({ token: token, message: "Success login" });
};

module.exports = authCtrl;
