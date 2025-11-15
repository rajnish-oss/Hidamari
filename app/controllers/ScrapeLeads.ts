import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page.
export async function ScrapeLeads() {
  const browser = await puppeteer.launch({
      defaultViewport: null
  })
  const page = await browser.newPage();
  
  // Navigate the page to a URL.
  await page.goto('https://developer.chrome.com/');
  
  await page.evaluate(() => {
    document.cookie = 'myCookie = MyCookieValue';
  });
  
  console.log(await browser.cookies());
}