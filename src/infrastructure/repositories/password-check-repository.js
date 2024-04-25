const { MissingParamError } = require('../../utils/errors')

module.exports = class PasswordCheckRepository {
  async save (password) {
    if (!password) {
      throw new MissingParamError('password')
    }

    // We can save to database here, for example

    return true
  }
}
