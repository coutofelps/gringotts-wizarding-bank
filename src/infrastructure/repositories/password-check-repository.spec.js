const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class PasswordCheckRepository {
    async save (password) {
      if (!password) {
        throw new MissingParamError('password')
      }
    }
  }

  const sut = new PasswordCheckRepository()

  return {
    sut
  }
}

describe('Password check repository', () => {
  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.save()
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
