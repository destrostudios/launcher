import { AppPage } from './app.page';

import { browser, logging } from 'protractor';

describe('LauncherApp', () => {
  let appPage: AppPage;

  beforeEach(() => {
    appPage = new AppPage();
  });

  it('should display button', () => {
    appPage.navigateTo();
    expect(appPage.getButtonText()).toEqual('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
