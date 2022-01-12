import test from 'ava'
import createContainer from './index'

test('Check create real container', async t => {
  t.truthy(createContainer())
})
