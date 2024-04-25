const { MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../../presentation/errors')

class PasswordCheckRepository {
  async save (password) {
    if (!password) {
      throw new MissingParamError('password')
    }

    // We can save to database here, for example

    return true
  }
}

const makeSut = () => {
  const sut = new PasswordCheckRepository()

  return {
    sut
  }
}

describe('Password check repository', () => {
  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    await expect(sut.save()).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should return ServerError if PasswordCheckRepository has no save method', async () => {
    const sut = new PasswordCheckRepository()
    sut.save = jest.fn().mockImplementationOnce(async () => {
      throw new ServerError()
    })

    const password = 'any_password'

    await expect(sut.save(password)).rejects.toThrow(ServerError)
  })

  test('Should return true if password is provided', async () => {
    const { sut } = makeSut()
    const password = 'valid_password'
    const result = await sut.save(password)

    expect(result).toBe(true)
  })
})
