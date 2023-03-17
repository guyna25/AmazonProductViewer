//external imports
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
//internal imports
const {get_products} = require('./product_scraper');
const {get_product_grid_html} = require('./product_display');
const {get_full_access_url} = require('./db_password_loader');
const {createProducts, getAllProducts} = require('./models/products.model');


//constants
const PORT = 3000;
const serach_words = ['ducks'];
const mongo_pass_path = 'product_viwer_pass.json';
const MONGO_URL = get_full_access_url(mongo_pass_path);

//variables
const server = http.createServer();

async function startServer() {
    await mongoose.connect(MONGO_URL);
    get_products(serach_words).then((vals) => {
        let product_arr = vals.filter((p) => {
            return !(p.name == '' && p.price == '' && p.rating == '' && p.image == '');
        });
        console.log('Loaded products');
        createProducts(product_arr);
        getAllProducts().then((data) => {
            console.log(data);
        }
        );
    });
};

startServer();

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});
  
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
