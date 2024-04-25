const request = require('supertest')
const app = require('../config/app')

describe('Password routes', () => {
  test('Should return 200 when valid password AbTp9!fok are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'AbTp9!fok'
      })
      .expect(200)
  })

  test('Should return 400 when valid password AbTp9 fok are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'AbTp9 fok'
      })
      .expect(400)
  })

  test('Should return 400 when valid password AbTp9!foA are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'AbTp9!foA'
      })
      .expect(400)
  })

  test('Should return 400 when valid password AbTp9!foo are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'AbTp9!foo'
      })
      .expect(400)
  })

  test('Should return 400 when valid password AAAbbbCc are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'AAAbbbCc'
      })
      .expect(400)
  })

  test('Should return 400 when valid password ab are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'ab'
      })
      .expect(400)
  })

  test('Should return 400 when valid password aa are provided', async () => {
    await request(app)
      .post('/api/password-check')
      .send({
        password: 'aa'
      })
      .expect(400)
  })
})
