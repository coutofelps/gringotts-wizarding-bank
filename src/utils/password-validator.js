const validator = require('validator')

module.exports = class PasswordValidator {
  isValid (password) {
    const options = {
      minLength: 9,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1
    }

    return validator.isStrongPassword(password, options)
  }
}
