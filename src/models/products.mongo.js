const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number,
    image: String,
});