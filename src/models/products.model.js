const { default: mongoose } = require('mongoose');
const Product = require('./products.mongo');

function createProduct(data) {
    const product = Product(data);
    product.save(); //.then(() => console.log('meow'));
};

function createProducts(data_array, callback_func) {
    const products = Product(data_array);
    products.save().then(callback_func);
};

function getAllProducts() {
    return Product.find();
};

module.exports = {
    createProduct,
    createProducts,
    getAllProducts,
};