//external imports
const http = require('http');
const path = require('path');
var url = require('url');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env')});
//internal imports
const {get_products} = require('./services/product_scraper');
const {get_product_grid_html} = require('./views/product_display');
const {ProductsModel} = require('./models/products.model');
const {mongoConnect} = require('./services/db');
const { dirname } = require('path');

//constants
const PORT = 3000;
const serach_words = ['lotion'];

//variables
const server = http.createServer();
const product_db = new ProductsModel();

async function startServer() {
    await mongoConnect();
};

startServer();
  
server.on('request', (req, res)=> {
    var requestData = url.parse(req.url, true);
    const items = requestData.pathname.split('/');
    if (items.length == 2 && items[1] === 'products') {  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const resp = get_product_grid_html(product_arr);
        res.write(resp);
        res.end();
    } else if (items.length == 2 && items[1] === 'products_test') {
        product_db.readMany({}).then( (vals) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.write(JSON.stringify(vals));
            res.end();
        });
    }
    else if (items.length == 2 && items[1] === 'search') {
        let q = requestData.query.q;
        get_products([q]).then((vals) => {
            console.log('Yggc');
            product_db.createMany(vals);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.write(JSON.stringify(vals));
            res.end();
        });
    }
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); //127.0.0.1 => localhost
