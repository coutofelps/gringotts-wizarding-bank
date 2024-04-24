const HttpReponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class PasswordCheckRouter {
  constructor (passworCheckUseCase) {
    this.passworCheckUseCase = passworCheckUseCase
  }

  async route (httpRequest) {
    try {
      const { password } = httpRequest.body

      if (!password) {
        return HttpReponse.badRequest(new MissingParamError('password'))
      }

      const isValidPassword = await this.passworCheckUseCase.check(password)

      if (!isValidPassword) {
        return HttpReponse.badRequest()
      }

      return HttpReponse.ok({ isValidPassword })
    } catch (error) {
      return HttpReponse.serverError()
    }
  }
}
