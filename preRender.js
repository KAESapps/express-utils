module.exports = function (req, res) {
  res.locals.user = req.user
  res.locals.errors = req.flash('error')
  res.locals.infos = req.flash('info')
}
