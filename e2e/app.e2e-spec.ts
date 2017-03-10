import { PathtracerWebgl2Page } from './app.po';

describe('pathtracer-webgl2 App', () => {
  let page: PathtracerWebgl2Page;

  beforeEach(() => {
    page = new PathtracerWebgl2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
