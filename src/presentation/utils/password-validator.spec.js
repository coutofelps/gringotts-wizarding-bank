const validator = require('validator')

class PasswordValidator {
  isValid (password) {
    return validator.isStrongPassword(password)
  }
}

const makeSut = () => {
  return new PasswordValidator()
}

describe('Password validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isPasswordValid = sut.isValid('AbTp9!fok')

    expect(isPasswordValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    const isPasswordValid = sut.isValid('invalid_password')

    expect(isPasswordValid).toBe(false)
  })
})
