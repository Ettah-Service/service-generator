import test from 'ava'
import createEventService from './event-service'

test.beforeEach(async t => {
  t.context.eventServiceClient = {
    post: () => {}
  }
})

test('Check event service create function', async t => t.truthy(createEventService))

test('Check dev mode event service', async t => {
  const {
    isProd = false,
    eventServiceClient,
    type = '1000-00-10000',
    entityId = 'mkn-service'
  } = t.context
  const service = createEventService({ isProd, eventServiceClient })
  const result = await service(type)({ entityId, ...{} })
  t.truthy(result)
})

test('Check prod mode event service', async t => {
  const {
    isProd = true,
    eventServiceClient,
    type = '1000-00-10000',
    entityId = 'mkn-service'
  } = t.context
  const service = createEventService({ isProd, eventServiceClient })
  const result = await service(type)({ entityId, ...{} })
  t.truthy(result)
})
