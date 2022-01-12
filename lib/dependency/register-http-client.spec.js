import test from 'ava'
import { prop, compose, keys } from '@meltwater/phi'
import { asFunction, createContainer } from 'awilix'
import config from '../../config'
import registerHttpClient, {
  createErrorHandler,
  createRequestLogger
} from './register-http-client'

test.beforeEach(async t => {})

test('Check error hander', async t => {
  const errorHandler = createErrorHandler()
  t.truthy(errorHandler)
  await t.throwsAsync(() => errorHandler({
    request: {
      baseUrl: 'http://localhost',
      url: 'http://localhost:3000',
      method: 'GET',
      responseType: 'json'
    },
    response: {
      status: 200,
      statusText: 'OK',
      data: { someData: {} }
    },
    message: 'Invalid input error',
    stack: new Error().stack
  }), { instanceOf: Error })
  await t.throwsAsync(() => errorHandler({}), { instanceOf: Error })
})

test('Check request logger', async t => {
  t.truthy(createRequestLogger)
  t.truthy(createRequestLogger('Service Name'))
  t.truthy(createRequestLogger('Service Name')({
    baseUrl: 'http://localhost',
    method: 'GET',
    url: 'http://localhost:3000'
  }))
})

test('Check client registration', async t => {
  const container = createContainer()
  const createIsProd = () => false
  container.register('isProd', asFunction(createIsProd).scoped())
  registerHttpClient({ container, config })
  const getRegistrations = compose(keys, prop('registrations'))
  const allRegistrations = getRegistrations(container)
  t.snapshot(allRegistrations)
})
