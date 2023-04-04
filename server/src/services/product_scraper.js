const puppeteer = require('puppeteer');

function get_products(search_terms) {
    const search_term = search_terms.join('+');
    const search_url = `http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=${search_term}`;
    return puppeteer
    .launch({headless:true})
    .then(function(browser) {
        
    return browser.newPage();
    })
    .then(function(page) {
    return page.goto(search_url)
        .then(function() {        
        return page.waitForSelector('.s-result-item').then(function() {
            return page.$$eval('.s-result-item', function(items, search_term) {
            return items.map(function(item) {
                console.log(search_term);
                const nameElement = item.querySelector('h2');
                const name = nameElement ? nameElement.innerText.trim() : '';
                const selector = '.a-size-base.a-color-secondary';
                const volumeElement = item.querySelector(selector);
                const volume = volumeElement ? volumeElement.innerText.trim() : '';
                const priceElement = item.querySelector('.a-price-whole');
                const price = priceElement ? priceElement.innerText.match('[0-9|\.]+', '')[0] : '';
                const ratingElement = item.querySelector('.a-icon-star-small > .a-icon-alt');
                const rating = ratingElement ? ratingElement.innerText.trim() : '';
                const imageElement = item.querySelector('img');
                const image = imageElement ? imageElement.src : '';
                return {
                    "search_term": search_term,
                    "name": name,
                    "volume": volume,
                    "price": price,
                    "rating": rating, 
                    "image":image
                };
            });
            }, search_term);
        });
        });
    })
    .then(function(html) {
        let res = html.filter((val) => {
            return val.name != '';
        });
        return res;
    })
    .catch(function(err) {
        console.log(err);
    });

}

module.exports = {
    get_products    
};
