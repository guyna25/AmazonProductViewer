const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

function get_product_grid_html(items) {
    const item_template_path = path.join(__dirname, '..', 'views', 'product.hbs');
    item_template = Handlebars.compile(fs.readFileSync(item_template_path, 'utf8'));
    const item_grid_template_path = path.join(__dirname, '..', 'views', 'product_grid.hbs');
    item_grid_template = Handlebars.compile(fs.readFileSync(item_grid_template_path, 'utf8'));
    items_html = items.map((item) => {
        return item_template({ "name": item.name, "price": item.price, "rating": item.rating, "img_path": item.image });
    });
    // console.log(items_html);
    items_html = item_grid_template({
        title: "example", 
        body:items_html
    }
    );
    console.log(__dirname);
    return items_html;
};

module.exports = {
    get_product_grid_html,
};