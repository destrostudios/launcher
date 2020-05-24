import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getButtonText(): Promise<string> {
    return element(by.css('input[type=submit]')).getText() as Promise<string>;
  }
}
