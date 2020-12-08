const mongoose = require('mongoose');
const product = mongoose.model('Product');

exports.createProduct = function (data, callback) {
    product.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

