import { DemoShopPage } from './app.po';

describe('demo-shop App', () => {
  let page: DemoShopPage;

  beforeEach(() => {
    page = new DemoShopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
