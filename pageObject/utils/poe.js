const selectors = require('../elements/locators.json'),
  text = require('../elements/values.json');

class PageObjectElement {
  find(element) {
    let pageElement = selectors[element];
    return $(pageElement.selector);
  }
  getSelector(element) {
    let pageElement = selectors[element];
    return pageElement.selector;
  }
  click(element) {
    let pageElement = selectors[element];
    return $(pageElement.selector).click();
  }
  getValue(element) {
    return text[element].value;
  }
  xpathIsDisplayed(element) {
    return browser.driver.findElement(By.xpath(selectors[element].selector)).isDisplayed();
  }
  cssIsDisplayed(element) {
    return $(selectors[element].selector).isDisplayed();
  }
  isButton(element) {
    return $(selectors[element].selector).isDisplayed();
  }
}

module.exports = PageObjectElement;
