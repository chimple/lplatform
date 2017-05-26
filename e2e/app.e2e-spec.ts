import { LplatformPage } from './app.po';

describe('lplatform App', () => {
  let page: LplatformPage;

  beforeEach(() => {
    page = new LplatformPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
