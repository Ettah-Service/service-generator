import test from 'ava'
import createGetConfig from './get-config'

test('Check get cofig route handler', async t => {
  t.truthy(createGetConfig)
  const getConfig = createGetConfig()
  t.snapshot(getConfig())
})
