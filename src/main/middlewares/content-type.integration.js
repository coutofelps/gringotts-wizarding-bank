const request = require('supertest')
const app = require('../config/app')

describe('Content-Type Middleware', () => {
  test('Should return JSON content-type', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/)
  })

  test('Should return XML as forced content-type', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('text/xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
