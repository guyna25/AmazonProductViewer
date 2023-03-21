const { default: mongoose } = require('mongoose');
const Product = require('./products.mongo');
const {Model} = require('./model');

class ProductsModel extends Model {
    constructor() {
        super(Product);
    };    
};

module.exports = {
    ProductsModel,
};