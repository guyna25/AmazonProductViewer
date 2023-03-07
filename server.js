const puppeteer = require('puppeteer');

puppeteer.launch({ headless: false }).then((browser)=> {
  const page = browser.newPage();
  return page;
}).then(((page) => {
  return page.goto('https://quotes.toscrape.com/search.aspx');
})).then((page_html) => {
  (async () => {
    console.log(await page_html.text());
  })();
  
});
// const page = browser.newPage();
// page.goto('https://quotes.toscrape.com/search.aspx');
// console.log(page);