// const csvtojsonV2=require("csvtojson/v2");

// const csvFilePath = "/Volumes/Du Lieu/PTUD Web/PTUDW-final/crawler/data.csv";
const fs = require('fs');


// async function main(){
//     const jsonArray = await csvtojsonV2().fromFile(csvFilePath);
    
    

//     // jsonArray[0].image_ids = imageLink;
//     // console.log(jsonArray[0]);
//     jsonArray.forEach(el=>{
//         // split image_ids
//         const imageLink = el.image_ids.split('|');
//         el.image_ids = imageLink;

//         // split size
//         const size = el.sizes.split('|');
//         el.sizes = size;

//     });
//     let data = JSON.stringify(jsonArray);
//     fs.writeFileSync('product.json', data);
// }

// main();

// const productModel = require("./models/productModel");

// const products = productModel.list();

// const temp = products.find(el => el.id = '57328817_001');
// console.log(temp);

const rawdata = fs.readFileSync('product.json');
const products = JSON.parse(rawdata);


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


const randomNumberProduct = getRndInteger(0,products.length-10);
const a = products.slice(randomNumberProduct,randomNumberProduct+4);
