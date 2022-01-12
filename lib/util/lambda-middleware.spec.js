import test from 'ava'
import {
  createErrorHandler,
  createMiddleware
} from './lambda-middleware'
import { noop } from '@meltwater/phi'

test('Check error handler when promise throws', async t => {
  const errorHandler = createErrorHandler(noop)
  errorHandler()
  t.pass()
})

test('Check how to respond in lambda promise resolves', async t => {
  const goodPromise = Promise.resolve({})
  await createMiddleware(goodPromise, noop)
  t.pass()
})
