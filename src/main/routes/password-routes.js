const passwordRouter = require('../composers/password-router-composer')
const ExpressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/password-check', ExpressRouterAdapter.adapt(passwordRouter))
}
