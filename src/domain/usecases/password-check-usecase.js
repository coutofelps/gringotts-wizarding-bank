const PasswordCheckRepository = require('../../infrastructure/repositories/password-check-repository')

module.exports = class PasswordCheckUseCase {
  constructor () {
    this.passwordCheckRepository = new PasswordCheckRepository()
  }

  async save (password) {
    // We can do any action here, like this:
    return this.passwordCheckRepository.save(password)
  }
}
