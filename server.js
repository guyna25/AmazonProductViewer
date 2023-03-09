const puppeteer = require('puppeteer');

const serach_words = ['ducks'];
const search_term = serach_words.join('+');
const search_url = `http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=${serach_words}`;

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(search_url)
      .then(function() {
        return page.waitForSelector('.s-result-item').then(function() {
          return page.content();
        });
      });
  })
  .then(function(html) {
    console.log(html);
  })
  .catch(function(err) {
    console.log(err);
  });