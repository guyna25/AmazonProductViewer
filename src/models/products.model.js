const { default: mongoose } = require('mongoose');
const Product = require('./products.mongo');
const {Model} = require('./model');

class ProductsModel extends Model {

    constructor() {
        super(Product);
    }
    
    // createOne(data) {
    //     super.createOne(data);
    // };
    // createMany() {
    //     super.createMany(data);
    // };
    // readOne() {
    //     super.readOne(data);
    // };
    // readMany() {
    //     super.readMany(data);
    // };
    // updateOne() {
    //     super.updateOne(data);
    // };
    // updateMany() {
    //     super.updateMany(data);
    // };
    // deleteOne() {
    //     super.deleteOne(data);
    // };
    // deleteMany() {
    //     super.deleteMany(data);
    // };
};

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
    ProductsModel,
};