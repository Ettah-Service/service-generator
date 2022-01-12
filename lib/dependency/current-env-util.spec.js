import test from 'ava'
import {
  createCurrentEnv,
  createIsDev,
  createIsProd
} from './current-env-util'

test('Check environment checks', async t => {
  t.is('production', createCurrentEnv({ env: 'production' }))
  t.is('prod', createCurrentEnv({ env: 'prod' }))

  t.is('development', createCurrentEnv({ env: 'development' }))
  t.is('dev', createCurrentEnv({ env: 'dev' }))

  t.true(createIsDev({ env: 'dev' }))
  t.true(createIsProd({ env: 'prod' }))

  t.false(createIsDev({ env: 'prod' }))
  t.false(createIsProd({ env: 'dev' }))
})
