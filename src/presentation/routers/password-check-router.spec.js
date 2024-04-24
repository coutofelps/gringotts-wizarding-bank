const PasswordCheckRouter = require('./password-check-router')
const MissingParamError = require('../helpers/missing-param-error')
const ServerError = require('../helpers/server-error')

const makePasswordCheckUseCaseSpy = () => {
  class PasswordCheckUseCaseSpy {
    async check (password) {
      this.password = password

      return this.isValidPassword
    }
  }

  return new PasswordCheckUseCaseSpy()
}

const makePasswordCheckUseCaseSpyWithError = () => {
  class PasswordCheckUseCaseSpy {
    async check () {
      throw new Error()
    }
  }

  return new PasswordCheckUseCaseSpy()
}

const makeSut = () => {
  const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpy()
  passwordCheckUseCaseSpy.isValidPassword = true

  const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy)

  return {
    sut,
    passwordCheckUseCaseSpy
  }
}

describe('Password checker router', () => {
  test('Should return 400 if no password is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: ''
      }
    }

    const httpReponse = await sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()

    const httpRequest = {}

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call PasswordCheckUseCase with correct params', async () => {
    const { sut, passwordCheckUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    await sut.route(httpRequest)
    expect(passwordCheckUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 500 if no PasswordCheckUseCase is provided', async () => {
    const sut = new PasswordCheckRouter()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no PasswordCheckUseCase has no check method', async () => {
    // Re-creating spy class with no check method
    const passwordCheckUseCaseSpy = new PasswordCheckRouter({})
    const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy)

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no PasswordCheckUseCase throws ', async () => {
    const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpyWithError()
    passwordCheckUseCaseSpy.isValidPassword = true

    const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy)

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 when valid credentials are provided', async () => {
    const { sut, passwordCheckUseCaseSpy } = makeSut()

    const httpRequest = {
      body: {
        password: 'valid_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.isValidPassword).toEqual(passwordCheckUseCaseSpy.isValidPassword)
  })
})
