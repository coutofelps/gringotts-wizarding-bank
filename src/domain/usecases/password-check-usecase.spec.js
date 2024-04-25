const { MissingParamError } = require('../../utils/errors')
const PasswordCheckRepository = require('../../infrastructure/repositories/password-check-repository')
const PasswordCheckUseCase = require('./password-check-usecase')

describe('PasswordCheckUseCase', () => {
  describe('Constructor', () => {
    test('Should create PasswordCheckUseCase instance', () => {
      const sut = new PasswordCheckUseCase()

      expect(sut).toBeInstanceOf(PasswordCheckUseCase)
    })

    test('Should initialize PasswordCheckRepository', () => {
      const sut = new PasswordCheckUseCase()

      expect(sut.passwordCheckRepository).toBeInstanceOf(PasswordCheckRepository)
    })
  })

  describe('save()', () => {
    test('Should throw MissingParamError if no password is provided', async () => {
      const sut = new PasswordCheckUseCase()
      await expect(sut.save()).rejects.toThrow(new MissingParamError('password'))
    })

    test('Should call PasswordCheckRepository.save() with provided password', async () => {
      const sut = new PasswordCheckUseCase()
      const passwordCheckRepositoryMock = {
        save: jest.fn().mockReturnValueOnce(Promise.resolve(true))
      }

      sut.passwordCheckRepository = passwordCheckRepositoryMock
      await sut.save('testpassword')
      expect(passwordCheckRepositoryMock.save).toHaveBeenCalledWith('testpassword')
    })

    test('Should return the result from PasswordCheckRepository', async () => {
      const sut = new PasswordCheckUseCase()
      const expectedResult = true

      jest.spyOn(sut.passwordCheckRepository, 'save').mockReturnValueOnce(Promise.resolve(expectedResult))
      const result = await sut.save('testpassword')
      expect(result).toBe(expectedResult)
    })

    test('Should throw error if PasswordCheckRepository.save() throws error', async () => {
      const sut = new PasswordCheckUseCase()
      const expectedError = new Error('Failed to save password')

      jest.spyOn(sut.passwordCheckRepository, 'save').mockImplementationOnce(() => {
        throw expectedError
      })
      await expect(sut.save('testpassword')).rejects.toThrow(expectedError)
    })
  })
})
