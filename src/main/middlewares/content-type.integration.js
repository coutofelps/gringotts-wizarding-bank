const request = require('supertest')

describe('Content-Type Middleware', () => {
  let app

  // Reseting Jest URL cache (used if you want to use same URL for an integration test)
  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })

  test('Should return JSON content-type', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return XML as forced content-type', async () => {
    app.get('/test_content_type', (req, res) => {
      res.type('text/xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /xml/)
  })
})
