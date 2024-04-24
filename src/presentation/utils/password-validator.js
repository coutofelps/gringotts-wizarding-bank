const validator = require('validator')

module.exports = class PasswordValidator {
  isValid (password) {
    return validator.isStrongPassword(password)
  }
}
