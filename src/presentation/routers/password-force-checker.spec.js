class PasswordForceCheckerRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpReponse.serverError()
    }

    const { password } = httpRequest.body

    if (!password) {
      return HttpReponse.badRequest('password')
    }
  }
}

class HttpReponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('Password force checker router', () => {
  test('Should return 400 if no password is provided', () => {
    // sut = system under test
    const sut = new PasswordForceCheckerRouter()

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
    const sut = new PasswordForceCheckerRouter()

    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new PasswordForceCheckerRouter()

    const httpRequest = {}

    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })
})
