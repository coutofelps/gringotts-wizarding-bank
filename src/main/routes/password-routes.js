const passwordRouter = require('../composers/password-router-composer')

module.exports = router => {
  router.post('/password-check', passwordRouter)
}
