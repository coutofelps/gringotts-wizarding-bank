const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class PasswordUseCase {
    async save (password) {
      if (!password) {
        throw new MissingParamError('password')
      }

      return true
    }
  }

  const sut = new PasswordUseCase()

  return {
    sut
  }
}

describe('Password check use case', () => {
  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.save()
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
