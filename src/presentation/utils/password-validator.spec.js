class PasswordValidator {
  isValid (password) {
    return true
  }
}

describe('Password validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = new PasswordValidator()
    const isPasswordValid = sut.isValid('AbTp9!fok')

    expect(isPasswordValid).toBe(true)
  })
})
