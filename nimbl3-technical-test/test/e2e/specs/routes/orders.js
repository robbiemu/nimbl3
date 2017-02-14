module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/orders')
      .waitForElementVisible('#orders', 5000)
      .assert.containsText('#orders', 'Orders')
      .end()
  }
}
