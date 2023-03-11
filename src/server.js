//external imports
const http = require('http');
//internal imports
const {get_products} = require('./product_scraper');

const serach_words = ['ducks'];
let product_arr = [];
get_products(serach_words).then((vals) => {
    console.log(vals);
    product_arr = vals;
});

const PORT = 3000;

const server = http.createServer();

  
server.on('request', (req, res)=> {
    const items = req.url.split('/');
    // console.log(items);
    if (items[1] === 'products') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(product_arr));
    } 
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); //127.0.0.1 => localhost