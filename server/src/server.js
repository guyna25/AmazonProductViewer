//external imports
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
//internal imports
const {get_products} = require('./services/product_scraper');
const {get_product_grid_html} = require('./views/product_display');
const {ProductsModel} = require('./models/products.model');
const {mongoConnect} = require('./services/db');

//constants
const PORT = 3000;
const serach_words = ['lotion'];

//variables
const server = http.createServer();
const product_db = new ProductsModel();

async function startServer() {
    mongoConnect();
    get_products(serach_words).then((vals) => {
        let product_arr = vals.filter((p) => {
            return !(p.name == '' && p.price == '' && p.rating == '' && p.image == '');
        });
        console.log('Loaded products');
        product_db.createMany(product_arr);
        product_db.readMany({}).then((data) => {
            // console.log(data);
        }
        );
    });
};

startServer();
  
server.on('request', (req, res)=> {
    const items = req.url.split('/');
    if (items.length == 2 && items[1] === 'products') {  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const resp = get_product_grid_html(product_arr);
        res.write(resp);
        res.end();
    } 
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); //127.0.0.1 => localhost
