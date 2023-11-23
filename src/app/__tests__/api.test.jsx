import { createRequest, createResponse } from 'node-mocks-http'
import RootLayout from '../layout'

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('API test', () => {
  it('1: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/register',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)

    // console.log(response._getData())
    // expect(response.getByRole('heading', { name: 'Sign Up' }))
  })

  it('2: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/login',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('3:should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/forgot-password',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('4: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/profile',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('5: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/user-list',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)

    // expect(response._getData()).toEqual('Sign Up');
    // expect(response).to.have.property('Sign Up');
    // expect(response._getData()).toEqual('Sign Up');
    // expect(JSON.stringify()).toBe('{Sign Up}')
  })

  it('6: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/homerootlayout',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('7: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/home',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('8: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/game-detail',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('9: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      url: '/game-list',
      // headers: {
      // 	origin: 'http://localhost:3000',
      // 	referer: 'http://localhost:3000'
      // },
      // _parsedUrl: {
      // 	pathname: '/game-list'
      // }
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })

  it('10: should return a 200 response', async () => {
    const request = createRequest({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        referer: 'http://localhost:3000',
      },
      _parsedUrl: {
        pathname: '/game-play',
      },
    })
    const response = createResponse()
    response.setHeader('Content-Type', 'text/html')

    await RootLayout(request, response)

    // Check if the response status code is 200.
    expect(response.statusCode).toEqual(200)
  })
})
