class PasswordUseCase {
  async save (password) {
    if (!password) {
      throw new Error()
    }
  }
}

describe('Password check use case', () => {
  test('Should throw if no password is provided', async () => {
    const sut = new PasswordUseCase()
    const promise = sut.save()
    expect(promise).rejects.toThrow()
  })
})
