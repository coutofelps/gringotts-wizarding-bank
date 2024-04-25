const ServerError = require('../errors/server-error')

module.exports = class HttpReponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static passwordStatus (isValid) {
    if (isValid) {
      return {
        statusCode: 200,
        body: { valid: true }
      }
    } else {
      return {
        statusCode: 400,
        body: { valid: false }
      }
    }
  }
}
