const PasswordUseCase = require('../../domain/usecases/password-check-usecase')
const PasswordCheckRouter = require('../../presentation/routers/password-check-router')
const PasswordValidator = require('../../utils/password-validator')

const passwordValidator = new PasswordValidator()
const passwordUseCase = new PasswordUseCase()
const passwordCheckRouter = new PasswordCheckRouter({
  passwordUseCase,
  passwordValidator
})

module.exports = passwordCheckRouter
