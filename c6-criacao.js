let fs = require("fs");
  
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');
  
const arr = readFileLines('arquivo.txt')

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    await page.goto('https://c6.c6consig.com.br/');

    await page.type('#EUsuario_CAMPO','');
    await page.waitForTimeout(2000);
    await page.type('#ESenha_CAMPO','');
    await page.click('#lnkEntrar');

    await page.waitForTimeout(5000);

    //hover cadastros
    const [cad] = await page.$x("//a[contains(., 'Cadastro')]");
    if (cad) {
        await cad.hover();
    }

    //hover operadores
    const [op] = await page.$x("//a[contains(., 'Operadores')]");
    if (op) {
        await op.hover();
    }

    //cadastro de operadores
    const [cadOp] = await page.$x("//a[contains(., 'Cadastro de Operadores')]");
    if (cadOp) {
        await cadOp.hover();
    }

    //incluir
    const [inc] = await page.$x("//a[contains(., 'Incluir')]");
    if (inc) {
        await inc.click();
    }

    await page.waitForTimeout(5000);

    var cont = 0;

    for (const elemento of arr) {
        await page.waitForTimeout(5000);
        await page.type('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_txtCpf_CAMPO',elemento);
        await page.waitForTimeout(2000);
        await page.click('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_txtEmail_CAMPO');
        await page.waitForTimeout(1000);
        await page.type('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_txtEmail_CAMPO', 'michel.xavier@gftcredmais.com.br');
        await page.waitForTimeout(1500);
        await page.type('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_txtDtNasc_CAMPO', '01/01/2000');
        await page.waitForTimeout(1500);
        await page.click('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_cmbGrupoAcesso1_CAMPO');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        await page.click('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_cmbUsuRestrito_CAMPO');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        await page.click('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_cmbRegimeContratacao_CAMPO');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        await page.click('#ctl00_Cph_FIJN1_jnDadosLogin_UcDUsu_cmbOrigem3_CAMPO');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        await page.click('#ctl00_Cph_UpdatePanel2');
        await page.keyboard.press('PageDown');
        await page.click('#btnConfirmar_txt');

        console.log('Registro: '+ cont++ +'\n');

        await page.waitForTimeout(1000);
        await page.click('#btnVoltar_txt');
        await page.evaluate(() => {
            location.reload(true)
         })
       
    }

})();
