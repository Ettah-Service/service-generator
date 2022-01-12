import test from 'ava'
import { asFunction } from 'awilix'
import { always, fromJson, resolveP } from '@meltwater/phi'
import config from './config'
import {
  endpointRoute,
  convertStringToJson
} from './router'

import createDependencyContainer from './lib/dependency/index'

test.beforeEach(async t => {
  t.context.depContainer = createDependencyContainer()
})

test('Check convertStringToJson', async t => {
  const str = '{ "key": "value" }'
  const obj = fromJson(str)
  t.deepEqual(obj, convertStringToJson(str))
  t.deepEqual(obj, convertStringToJson(obj))
})

test('Check endpointRoute', async t => {
  config.routeKey = 'testRouteHandler'
  const depContainer = createDependencyContainer()
  const createTestRouteHandler = () => async input => {
    return { data: { status: 'working' } }
  }
  depContainer.register(config.routeKey, asFunction(createTestRouteHandler).scoped())
  endpointRoute(resolveP({}), {}, always({ statusCode: 200 }))
  t.pass()
})
