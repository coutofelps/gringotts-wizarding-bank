const MissingParamError = require('./missing-param-error')

module.exports = class HttpReponse {
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

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}
