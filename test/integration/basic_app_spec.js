/* eslint-env protractor */

describe('the basic angular app', () => {
  it('should have a two way data binding', () => {
    browser.get('http://localhost:5000');
    element(by.model('greeting')).sendKeys('test greeting');
    element(by.id('greeting')).getText().then(function (text) {
      expect(text).toEqual('test greeting');
    });
  });
});
