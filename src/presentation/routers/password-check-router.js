const HttpReponse = require('../helpers/http-response')

module.exports = class PasswordCheckRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError()
    }

    const { password } = httpRequest.body

    if (!password) {
      return HttpReponse.badRequest('password')
    }
  }
}
