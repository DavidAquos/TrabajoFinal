const mongoose = require('mongoose');
const {Schema} = mongoose;

const RedSocialSchema = new Schema({
    nombre: String,
    img: String,
    url: String,
});

module.exports = mongoose.model('RedSocial', RedSocialSchema);
