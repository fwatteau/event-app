import { EventAppPage } from "./app.po";

describe("event-app App", () => {
  let page: EventAppPage;

  beforeEach(() => {
    page = new EventAppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Welcome to app!!");
  });
});
