const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS
  const USERNAME = 'laszloagi1@rogers.com',
    PASSWORD = 'agiles1';

  const page = await browser.newPage();
  await page.goto('https://www.netflix.com/login');
  await page.fill('input[name="userLoginId"]', USERNAME);
  await page.fill('input[name="password"]', PASSWORD);
  await page.click('button[type="submit"]');

  // Waits for the page to load and then checks the URL
  // If submit redirects to "Browse" then we successfullly logged in

  async function checkPage() {
    await page.waitForNavigation({ waitUntil: 'networkidle' });
    const url = await page.url();
    console.log(url);
    if (url === 'https://www.netflix.com/browse') {
      console.log('Login successful');
    } else {
      console.log('Login failed');
    }
  }

  await checkPage();
})();
