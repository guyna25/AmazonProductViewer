const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    search_term: String,
    name: String,
    volume: String,
    rating: String,
    price: Number,
    image: String,
});
module.exports = mongoose.model('Product', productsSchema);