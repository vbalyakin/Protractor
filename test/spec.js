const { browser } = require('protractor'),
    EC = require('protractor').ExpectedConditions,
    PageObjectElement = require('../pageObject/utils/poe');

const elem = new PageObjectElement();

describe('Testing "litres.ru" website [TC-145 "Validate book data"]', function () {

    it('should download homepage', async function () {
        await browser.get(elem.getValue('homePage'));
        expect(browser.getTitle()).toBe(elem.getValue('homeTitle'));
    });

    it('should find "Harry Potter" book', async function () {
        await elem.find('searchField').sendKeys(elem.getValue('harryBook'));
        await elem.click('searchButton');
        expect(browser.getTitle()).toBe(elem.getValue('harryResult'));
    });

    it('should choose first book', async function () {
        await elem.click('firstHarryBook');
        expect(browser.getTitle()).toBe(elem.getValue('harryTitle'));
    });

    it('verify author', async function () {
        expect(elem.xpathIsDisplayed('author')).toBe(true);
    });

    it('verify name of book', async function () {
        expect(elem.xpathIsDisplayed('nameOfBook')).toBe(true);
    });

    it('verify price', async function () {
        expect(elem.xpathIsDisplayed('price')).toBe(true);
    });

    it('"BUY" button is displayed', async function () {
        expect(elem.isButton('buyButton')).toBe(true);
    });

});

describe('Testing "litres.ru" website [TC-146 "Add book to cart"]', function () {

    it('should download homepage', async function () {
        await browser.get(elem.getValue('homePage'));
        expect(await browser.getTitle()).toBe(elem.getValue('homeTitle'));
    });
    
    it('should find "Harry Potter" book', async function () {
        await elem.find('searchField').sendKeys(elem.getValue('harryBook'));
        await elem.click('searchButton');
        expect(await browser.getTitle()).toBe(elem.getValue('harryResult'));
    });
    
    it('should choose first book', async function () {
        browser.wait(EC.presenceOf(elem.find('firstHarryBook')), 10000);
        await elem.click('firstHarryBook');
        browser.wait(EC.titleContains(elem.getValue('harryTitle')), 5000);
        expect(await browser.getTitle()).toBe(elem.getValue('harryTitle'));
    });
    
    it('add book to cart', async function () {
        browser.wait(EC.presenceOf(elem.find('cartButton')), 10000);
        await elem.click('cartButton');
        browser.wait(EC.presenceOf(elem.find('cartActive')), 10000);
        await browser.navigate().refresh();
        expect(await elem.cssIsDisplayed('cartActive')).toBe(true);
    });

    it('go to "My Books" section', async function () {
        await elem.click('myBooks');
        browser.wait(EC.titleContains(elem.getValue('allMyBooks')), 5000);
        expect(await browser.getTitle()).toBe(elem.getValue('allMyBooks'));
    });
    
    it('go to cart section', async function () {
        await browser.navigate().refresh();
        await elem.click('cartInMyBooks');
        browser.wait(EC.presenceOf(elem.find('cartOn')), 5000);
        expect(await elem.cssIsDisplayed('cartOn')).toBe(true);
    });

    it('validate price', async function () {
        expect(await elem.find('itemsPrice').getText()).toEqual(elem.getValue('basicPrice'));
    });

    it('"Buy & Download button" is displayed', async function () {
        expect(await elem.cssIsDisplayed('buyAndDownload')).toBe(true);
    });

    it('Author of book is confirmed', async function () {
        expect(await elem.xpathIsDisplayed('harryAuthor')).toBe(true);
    });

    it('Name of book is confirmed', async function () {
        expect(await elem.cssIsDisplayed('cartBook')).toBe(true);
    });
});
