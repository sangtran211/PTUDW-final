const productModel = require('../models/productModel');
const fs = require('fs');

exports.index = async (req,res,next) =>{
    // get product from model
    const products = productModel.list();

    // Pass data to view to display list of product
    res.render('shop/shop', {listProduct: products, active: {Shop:true}});
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function readFullData(){
    const rawdata = fs.readFileSync('./product.json');
    return JSON.parse(rawdata);
}

exports.getProductById = async (req,res,next) =>{
    // get product from model
    const products = productModel.list();
    const dataProduct = products.find(el => el.id == req.params.id);


    const fullProducts = readFullData();
    const randomNumberProduct = getRndInteger(0,fullProducts.length-10);
    const relatedProducts = fullProducts.slice(randomNumberProduct,randomNumberProduct+4);


    //pass data to view
    res.render('product/product-details', {
        resultProduct: dataProduct,
        resultRelated: relatedProducts,
        active:{Shop:true}
    });
};