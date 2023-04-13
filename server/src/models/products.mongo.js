const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    search_term: String,
    name: String,
    volume: String,
    rating: String,
    price: Number,
    image: String,
    ml_unit: Number,
});
module.exports = mongoose.model('Product', productsSchema);