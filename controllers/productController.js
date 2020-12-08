const productModel = require('../models/productModel');
const fs = require('fs');

exports.index = async (req, res, next) => {
    try {
        // get product from model
        const products = await productModel.find({}).list();

        // Pass data to view to display list of product
        res.render('./shop/shop', {listProduct: products, active: {Shop: true}});
    } catch {
        res.redirect('/');
    };
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.getProductById = async (req, res, next) =>{
    // get product from model
    const products = await productModel.find({}).list();
    const dataProduct = products.find(el => el.id == req.params.id);

    const randomNumber = getRndInteger(0, products.length - 5);

    const relatedProducts = products.slice(randomNumber, randomNumber + 4);

    // pass data to view
    res.render('./shop/product-details', {
        resultProduct: dataProduct,
        resultRelated: relatedProducts,
        active: {Shop: true}
    });
};