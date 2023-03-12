const puppeteer = require('puppeteer');

function get_products(search_terms) {
    const search_term = search_terms.join('+');
    const search_url = `http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=${search_terms}`;
    return puppeteer
    .launch()
    .then(function(browser) {
    return browser.newPage();
    })
    .then(function(page) {
    return page.goto(search_url)
        .then(function() {
        return page.waitForSelector('.s-result-item').then(function() {
            return page.$$eval('.s-result-item', function(items) {
            return items.map(function(item) {
                const nameElement = item.querySelector('h2');
                const name = nameElement ? nameElement.innerText.trim() : '';
                const priceElement = item.querySelector('.a-price-whole');
                const price = priceElement ? priceElement.innerText.trim() : '';
                const ratingElement = item.querySelector('.a-icon-star-small > .a-icon-alt');
                const rating = ratingElement ? ratingElement.innerText.trim() : '';
                const imageElement = item.querySelector('img');
                const image = imageElement ? imageElement.src : '';
                // if (image !== '') {
                //     console.log('kkk');
                //     console.log(fetch(image));
                // };
                return { "name": name, "price": price, "rating": rating, 
                "image":"public/images/skimountain.jpg"};
            });
            }
            );
        });
        });
    })
    .then(function(html) {
        // console.log(html);
        return html;
    })
    .catch(function(err) {
        console.log(err);
    });

}


module.exports = {
    get_products    
};