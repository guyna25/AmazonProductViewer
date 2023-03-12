//external imports
const http = require('http');
const path = require('path');

//internal imports
const {get_products} = require('./product_scraper');
const {get_product_grid_html} = require('./product_display');

const serach_words = ['ducks'];
let product_arr = [];
get_products(serach_words).then((vals) => {
    product_arr = vals.filter((p) => {
        return !(p.name == '' && p.price == '' && p.rating == '' && p.image == '');
    });
    console.log('Loaded products');
});

const PORT = 3000;

const server = http.createServer();

  
server.on('request', (req, res)=> {
    const items = req.url.split('/');
    if (items.length == 2 && items[1] === 'products') {  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // console.log(product_arr);
        const resp = get_product_grid_html(product_arr);
        // console.log(resp);
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