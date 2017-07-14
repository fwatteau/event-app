import { RepasAppPage } from './app.po';

describe('repas-app App', () => {
  let page: RepasAppPage;

  beforeEach(() => {
    page = new RepasAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
