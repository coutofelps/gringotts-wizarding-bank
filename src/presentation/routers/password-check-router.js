const HttpReponse = require('../helpers/http-response')

module.exports = class PasswordCheckRouter {
  constructor (passworCheckUseCase) {
    this.passworCheckUseCase = passworCheckUseCase
  }

  route (httpRequest) {
    try {
      const { password } = httpRequest.body

      if (!password) {
        return HttpReponse.badRequest('password')
      }

      const isValidPassword = this.passworCheckUseCase.check(password)

      if (!isValidPassword) {
        return HttpReponse.badRequest()
      }

      return HttpReponse.ok({ isValidPassword })
    } catch (error) {
      return HttpReponse.serverError()
    }
  }
}
