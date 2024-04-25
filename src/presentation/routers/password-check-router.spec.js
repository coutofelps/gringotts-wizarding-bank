const PasswordCheckRouter = require('./password-check-router')
const { InvalidParamError, MissingParamError } = require('../../utils/errors')
const { ServerError } = require('../errors')

const makeSut = () => {
  const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpy()
  const passwordValidatorSpy = makePasswordValidator()
  passwordCheckUseCaseSpy.isValidPassword = true

  const sut = new PasswordCheckRouter({
    passwordCheckUseCase: passwordCheckUseCaseSpy,
    passwordValidator: passwordValidatorSpy
  })

  return {
    sut,
    passwordCheckUseCaseSpy,
    passwordValidatorSpy
  }
}

const makePasswordCheckUseCaseSpy = () => {
  class PasswordCheckUseCaseSpy {
    async save (password) {
      this.password = password

      return this.isValidPassword
    }
  }

  return new PasswordCheckUseCaseSpy()
}

const makePasswordCheckUseCaseSpyWithError = () => {
  class PasswordCheckUseCaseSpy {
    async save () {
      throw new Error()
    }
  }

  return new PasswordCheckUseCaseSpy()
}

const makePasswordValidator = () => {
  class PasswordValidatorSpy {
    isValid (password) {
      this.password = password
      return this.isPasswordValid
    }
  }

  const passwordValidatorSpy = new PasswordValidatorSpy()
  passwordValidatorSpy.isPasswordValid = true
  return passwordValidatorSpy
}

const makePasswordValidatorWithError = () => {
  class PasswordValidatorSpy {
    isValid (password) {
      throw new Error()
    }
  }

  return new PasswordValidatorSpy()
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

  test('Should return 500 if no PasswordCheckUseCase has no save method', async () => {
    // Re-creating spy class with no save method
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

  test('Should return 500 if PasswordCheckUseCase throws ', async () => {
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

  test('Should return 400 if an invalid password is provided ', async () => {
    const { sut, passwordValidatorSpy } = makeSut()
    passwordValidatorSpy.isPasswordValid = false

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('password'))
  })

  test('Should return 500 if no PasswordValidator is provided', async () => {
    const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpy()
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

  test('Should return 500 if PasswordValidator has no isValid method', async () => {
    const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpy()
    // Re-creating spy class no isValid method
    const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy, {})

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if PasswordValidator throws ', async () => {
    const passwordCheckUseCaseSpy = makePasswordCheckUseCaseSpy()
    const passwordValidatorSpy = makePasswordValidatorWithError()

    const sut = new PasswordCheckRouter(passwordCheckUseCaseSpy, passwordValidatorSpy)

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 when valid password are provided', async () => {
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

  test('Should call PasswordValidator with correct password', async () => {
    const { sut, passwordValidatorSpy } = makeSut()

    const httpRequest = {
      body: {
        password: 'valid_password'
      }
    }

    await sut.route(httpRequest)
    expect(passwordValidatorSpy.password).toEqual(httpRequest.body.password)
  })

  test('Should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const passwordCheckUseCase = makePasswordCheckUseCaseSpy()
    const suts = [].concat(
      new PasswordCheckRouter(),
      new PasswordCheckRouter({}),
      new PasswordCheckRouter({
        passwordCheckUseCase: invalid
      }),
      new PasswordCheckRouter({
        passwordCheckUseCase
      }),
      new PasswordCheckRouter({
        passwordCheckUseCase,
        passwordValidator: invalid
      })
    )

    for (const sut of suts) {
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      }

      const httpReponse = await sut.route(httpRequest)
      expect(httpReponse.statusCode).toBe(500)
      expect(httpReponse.body).toEqual(new ServerError())
    }
  })

  test('Should throw if any dependency throws', async () => {
    const passwordCheckUseCase = makePasswordCheckUseCaseSpy()
    const suts = [].concat(
      new PasswordCheckRouter({
        passwordCheckUseCase: makePasswordCheckUseCaseSpyWithError()
      }),
      new PasswordCheckRouter({
        passwordCheckUseCase,
        passwordValidator: makePasswordValidatorWithError()
      })
    )

    for (const sut of suts) {
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      }

      const httpReponse = await sut.route(httpRequest)
      expect(httpReponse.statusCode).toBe(500)
      expect(httpReponse.body).toEqual(new ServerError())
    }
  })
})
