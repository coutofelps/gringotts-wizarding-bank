const HttpReponse = require('../helpers/http-response')

module.exports = class PasswordCheckRouter {
  constructor (passworCheckUseCase) {
    this.passworCheckUseCase = passworCheckUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.passworCheckUseCase || !this.passworCheckUseCase.check) {
      return HttpReponse.serverError()
    }

    const { password } = httpRequest.body

    if (!password) {
      return HttpReponse.badRequest('password')
    }

    const isValidPassword = this.passworCheckUseCase.check(password)

    if (!isValidPassword) {
      return HttpReponse.badRequest()
    }

    return HttpReponse.ok({ isValidPassword })
  }
}
