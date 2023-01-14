import { APIError } from '../../errors/APIError'

import { delay } from '../../utils/delay'

export class HttpClient {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  async get (path) {
    await delay()

    const response = await fetch(`${this.baseURL}${path}`)

    const contentType = response.headers.get('Content-Type')

    let body = null

    if (contentType.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new APIError(response, body)
  }
}