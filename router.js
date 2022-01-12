import {
  is,
  fromJson,
  pick,
  defaultWhen,
  isNilOrEmpty
} from '@meltwater/phi'
import createLogger from './lib/util/logger'
import createDepContainer from './lib/dependency'
import configuration from './config'
import { createMiddleware } from './lib/util/lambda-middleware'

export const convertStringToJson = (raw) => is(String, raw) ? fromJson(raw) : raw

export const endpointRoute = (event, context, cb) => {
  const { routeKey } = configuration
  const log = createLogger('router:endpointRoute')
  log('Route running', routeKey, event.queryStringParameters)
  const inputObject = pick(['body', 'pathParameters', 'queryStringParameters'], defaultWhen(isNilOrEmpty, {}, event))
  const container = createDepContainer()
  log('Route Key', routeKey)
  const routeFunction = container.resolve(routeKey)
  return createMiddleware(routeFunction(inputObject), cb)
}
