const { MissingParamError } = require('../../utils/errors')
const PasswordCheckRepository = require('../../infrastructure/repositories/password-check-repository')

class PasswordUseCase {
  constructor () {
    this.passwordCheckRepository = new PasswordCheckRepository()
  }

  async save (password) {
    // We can do any action here, like this:
    return this.passwordCheckRepository.save(password)
  }
}

describe('Password check use case', () => {
  test('Should throw if no password is provided', async () => {
    const sut = new PasswordUseCase()
    const promise = sut.save()
    await expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call PasswordCheckRepository with correct password', async () => {
    const sut = new PasswordUseCase()
    const passwordCheckRepositorySpy = jest.spyOn(sut.passwordCheckRepository, 'save')

    await sut.save('testpassword')

    expect(passwordCheckRepositorySpy).toHaveBeenCalledWith('testpassword')
  })

  test('Should return the result from PasswordCheckRepository', async () => {
    const sut = new PasswordUseCase()
    jest.spyOn(sut.passwordCheckRepository, 'save').mockReturnValueOnce(Promise.resolve(true))

    const result = await sut.save('testpassword')

    expect(result).toBe(true)
  })

  test('Should throw if PasswordCheckRepository throws', async () => {
    const sut = new PasswordUseCase()
    jest.spyOn(sut.passwordCheckRepository, 'save').mockImplementationOnce(() => {
      throw new Error('Failed to save password')
    })

    const promise = sut.save('testpassword')

    await expect(promise).rejects.toThrow(new Error('Failed to save password'))
  })
})
