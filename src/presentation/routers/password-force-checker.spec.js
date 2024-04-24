class PasswordForceCheckerRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }

    const { password } = httpRequest.body

    if (!password) {
      return {
        statusCode: 400
      }
    }
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
