const PasswordUseCase = require('../../domain/usecases/password-check-usecase')
const PasswordCheckRouter = require('../../presentation/routers/password-check-router')
const PasswordValidator = require('../../utils/password-validator')

module.exports = class PasswordCheckComposer {
  static compose () {
    const passwordValidator = new PasswordValidator()
    const passwordUseCase = new PasswordUseCase()

    return new PasswordCheckRouter({
      passwordUseCase,
      passwordValidator
    })
  }
}
