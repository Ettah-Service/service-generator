import {
  prop,
  toString,
  toJson,
  either,
  path,
  always,
  when,
  is,
  defaultTo
} from '@meltwater/phi'
import createLogger from './logger'

export const createErrorHandler = cb => error => {
  const log = createLogger('router:error')
  const getStatuCode = either(path(['statusCode']), path(['output', 'statusCode']))
  const statusCode = either(getStatuCode, always(400))(error)
  const headers = { 'Content-Type': 'text/plain' }
  const getBody = either(prop('message'), toString)
  const body = getBody(error)
  log(error)
  cb(null, { statusCode, headers, body })
}

export const createMiddleware = (
  dataPromise,
  cb,
  defaultContentType = 'application/json',
  defaultIsBase64Encoded = false,
  defaultAccessControlOrigin = '*'
) => {
  const convertToStringConditionally = when(is(Object), toJson)
  dataPromise.then(({
    contentType,
    data,
    statusCode = 200,
    isBase64Encoded,
    accessControlOrigin
  }) => {
    const getHeaders = () => {
      const cType = defaultTo(defaultContentType, contentType)
      const aCOrigin = defaultTo(defaultAccessControlOrigin, accessControlOrigin)
      const defaultHeaders = {
        'Content-Type': cType,
        'Access-Control-Allow-Origin': aCOrigin
      }
      return defaultHeaders
    }
    return ({
      statusCode,
      headers: getHeaders(),
      body: convertToStringConditionally(data),
      isBase64Encoded: defaultTo(defaultIsBase64Encoded, isBase64Encoded)
    })
  })
    .then(response => cb(null, response))
    .catch(createErrorHandler(cb))
}
