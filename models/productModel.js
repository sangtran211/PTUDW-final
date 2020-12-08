const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    sku: String,
    name: String,
    category: String,
    price: Number,
    brand: String,
    colorId: String,
    color: String,
    imageId: [String],
    size: [String],
    description: String,
    information: [String],
    url: String
});

const product = new mongoose.model('Product', schema);

module.exports = product;