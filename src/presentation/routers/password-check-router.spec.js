const PasswordCheckRouter = require('./password-check-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class PasswordCheckUseCaseSpy {
    check (password) {
      this.password = password
    }
  }

  const passwordCheckUseCaseSpy = new PasswordCheckUseCaseSpy()
  const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy)

  return {
    sut,
    passwordCheckUseCaseSpy
  }
}

describe('Password checker router', () => {
  test('Should return 400 if no password is provided', () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: ''
      }
    }

    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()

    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()

    const httpRequest = {}

    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should call PasswordCheckUseCase with correct params', () => {
    const { sut, passwordCheckUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    sut.route(httpRequest)
    expect(passwordCheckUseCaseSpy.password).toBe(httpRequest.body.password)
  })
})
