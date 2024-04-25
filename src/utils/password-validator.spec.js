const PasswordValidator = require('./password-validator')

describe('Password Validator', () => {
  describe('isValid', () => {
    test('Should return false if password contains a space', () => {
      const password = 'password with space'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password has repeated characters', () => {
      const password = 'password with repeated characters'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password length is less than 9 characters', () => {
      const password = '123Ab!'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password has no numbers', () => {
      const password = 'PasswordNoNumbers!'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password has no lowercase letters', () => {
      const password = 'PASSWORDNOLOWERCASE!'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password has no uppercase letters', () => {
      const password = 'passwordnouppercase!'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password has no symbols', () => {
      const password = 'PasswordNoSymbols123'
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })

    test('Should return false if password is an empty string', () => {
      const password = ''
      const passwordValidator = new PasswordValidator()
      const isValid = passwordValidator.isValid(password)
      expect(isValid).toBe(false)
    })
  })
})
