import withSession from '../../lib/withSession'

export default withSession(async function (req, res) {
  req.session.destroy()
  res.redirect('/login')
})
