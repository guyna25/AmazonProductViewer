const puppeteer = require('puppeteer');

function get_products(search_terms) {
  const search_term = search_terms.join('+');
  const search_url = `http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=${search_term}`;
  const unitToMl = {
    'lb': 453.592, // pound
    'oz': 28.3495, // ounce
    'g': 1, // gram
    'kg': 1000, // kilogram
    'fl': 29.5735,// usually means fluid ounce
    'fl oz': 29.5735, // fluid ounce
    'mL': 1, // milliliter
    'L': 1000, // liter
    'item': 1, // item
    'piece': 1, // piece
    'pack': 1 // pack
  };

  return puppeteer.launch({headless:true})
    .then(function(browser) {
      return browser.newPage()
        .then(function(page) {
          return page.goto(search_url)
            .then(function() {
              return page.waitForSelector('.s-result-item')
                .then(function() {
                  return page.$$eval('.s-result-item', function(items, search_term, unitMap) {
                    return items.map(function(item) {
                      //get name
                      const nameElement = item.querySelector('h2');
                      const name = nameElement ? nameElement.innerText.trim() : '';
                      const selector = '.a-size-base.a-color-secondary';
                      //get volume
                      const volumeElement = item.querySelector(selector);
                      const volume = volumeElement ? volumeElement.innerText.trim() : '';
                      const volume_match = /^([0-9,]+(?:\.[0-9]*)?)\s*([a-zA-Z]+)/.exec(volume);
                      //get price
                      const priceElement = item.querySelector('.a-price-whole');
                      const price = priceElement ? priceElement.innerText.match('[0-9|\.]+', '')[0] : '';
                      //get rating
                      const ratingElement = item.querySelector('.a-icon-star-small > .a-icon-alt');
                      let rating = ratingElement ? ratingElement.innerText.trim() : '';
                      const rating_match = /[0-5].\d/.exec(rating);
                      //get image
                      const imageElement = item.querySelector('img');
                      const image = imageElement ? imageElement.src : '';
                      if (!(volume_match && rating_match)) {
                        //every product should have a rating and volume
                        return -1;
                      }
                      const quantity = volume_match[1].replace(',', '');
                      const unit = volume_match[2];
                      if (!(unit.toLowerCase() in unitMap)) {
                        console.log("========================================");
                        console.log(unitMap);
                        console.log("========================================");
                        return -1;
                      }
                      return {
                          "search_term": search_term,
                          "name": name,
                          "quantity": quantity,
                          "unit": unit,
                          "price": price,
                          "rating": rating_match[0],
                          "image": image,
                          "ml_quantity": (quantity * unitMap[unit.toLowerCase()]).toFixed(4),
                        };
                    });
                  }, search_term, unitToMl).catch(function(err) {
                    console.log(err);
                    return -1;
                  });
                }).catch(function(err) {
                    // this means the scraping should stop right now, as we want to compare the items it'd be better to just retry another time
                    return -1;
                  });
            })
            .then(function(html) {
              if (html == -1) {
                    return -1;
                }
              let res = html.filter((val) => {
                return val !== -1 && val.name != '' && val.price !== '';
              });
              console.log(res);
              return res;
            })
        })
    });
}

module.exports = {
  get_products
};
