import app from '../src/app'
import { describe, it, expect } from 'vitest'

const request = require('supertest')

describe('API routes', () => {
  it('should return a hello mwssage on GET /login', async () => {
    const response = await request(app).get('/login')
    expect(response.status).toBe(200)
  })
})
