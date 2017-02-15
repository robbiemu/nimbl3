module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/order/new')
      .waitForElementVisible('body', 5000)
      .assert.containsText('#new-order', 'New Order')
      .url(devServer + '/order/1')
      .waitForElementVisible('body', 5000)
      .assert.containsText('#show-order', 'Order 1')
      .end()
  }
}
