class PasswordForceCheckerRouter {
  route (httpRequest) {
    if (!httpRequest.body.password) {
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
})
