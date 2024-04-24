const HttpReponse = require('../helpers/http-response')
const { InvalidParamError, MissingParamError } = require('../errors')

module.exports = class PasswordCheckRouter {
  constructor (passwordCheckUseCase, passwordValidator) {
    this.passwordCheckUseCase = passwordCheckUseCase
    this.passwordValidator = passwordValidator
  }

  async route (httpRequest) {
    try {
      const { password } = httpRequest.body

      if (!password) {
        return HttpReponse.badRequest(new MissingParamError('password'))
      }

      if (!this.passwordValidator.isValid(password)) {
        return HttpReponse.badRequest(new InvalidParamError('password'))
      }

      const isValidPassword = await this.passwordCheckUseCase.save(password)

      if (!isValidPassword) {
        return HttpReponse.badRequest()
      }

      return HttpReponse.ok({ isValidPassword })
    } catch (error) {
      return HttpReponse.serverError()
    }
  }
}
