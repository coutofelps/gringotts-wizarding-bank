const PasswordCheckRouter = require('./password-check-router')
const MissingParamError = require('../helpers/missing-param-error')

describe('Password checker router', () => {
  test('Should return 400 if no password is provided', () => {
    // sut = system under test
    const sut = new PasswordCheckRouter()

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
    const sut = new PasswordCheckRouter()

    const httpReponse = sut.route()
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new PasswordCheckRouter()

    const httpRequest = {}

    const httpReponse = sut.route(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
  })
})
