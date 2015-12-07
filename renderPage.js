var preRender = require('./preRender')

module.exports = function renderPage (path) {
  return function (req, res) {
    preRender(req, res)
    res.render(path)
  }
}
