const HttpReponse = require('../helpers/http-response')
const { MissingParamError } = require('../../utils/errors')

module.exports = class PasswordCheckRouter {
  constructor ({ passwordCheckUseCase, passwordValidator } = {}) {
    this.passwordCheckUseCase = passwordCheckUseCase
    this.passwordValidator = passwordValidator
  }

  async route (httpRequest) {
    try {
      const { password } = httpRequest.body

      if (!password) {
        return HttpReponse.badRequest(new MissingParamError('password'))
      }

      /*
      // If we need to use an use case
      const passwordIsSaved = await this.passwordCheckUseCase.save(password)

      if (!passwordIsSaved) {
        return HttpReponse.badRequest()
      }
      */

      return HttpReponse.passwordStatus(this.passwordValidator.isValid(password))
    } catch (error) {
      console.error(error)
      return HttpReponse.serverError()
    }
  }
}
