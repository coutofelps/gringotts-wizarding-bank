const PasswordRouterComposer = require('../composers/password-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  const passwordRouter = PasswordRouterComposer.compose()
  router.post('/password-check', adapt(passwordRouter))
}
