const validator = require('validator')

module.exports = class PasswordValidator {
  isValid (password) {
    if (password.includes(' ')) {
      return false
    }

    if (this.hasRepeatedCharacters(password)) {
      return false
    }

    const options = {
      minLength: 9,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1
    }

    return validator.isStrongPassword(password, options)
  }

  hasRepeatedCharacters (password) {
    const normalizedPassword = password.toLowerCase()
    const uniqueCharacters = new Set()

    for (const char of normalizedPassword) {
      if (uniqueCharacters.has(char)) {
        return true
      }
      uniqueCharacters.add(char)
    }

    return false
  }
}
