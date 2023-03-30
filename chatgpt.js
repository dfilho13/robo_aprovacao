const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://c6.c6consig.com.br/');

  // preenche as credenciais de login
  await page.type('#ctl00_phGeral_txtLogin', '04555012380_000169');
  await page.type('#ctl00_phGeral_txtSenha', 'Masters010*');

  // clica no botão de login
  await page.click('#ctl00_phGeral_btnEntrar');

  await page.waitForNavigation();

  // confere se o login foi bem sucedido
  const title = await page.title();
  if (title === 'C6 Consignado - Início') {
    console.log('Login bem sucedido!');
  } else {
    console.log('Falha ao fazer login.');
  }

  await browser.close();
})();
