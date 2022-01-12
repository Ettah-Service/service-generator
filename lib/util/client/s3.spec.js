import test from 'ava'
import createDepContainer from '../../dependency'

test.beforeEach(async t => {
  const depContainer = createDepContainer()
  t.context.s3Client = depContainer.resolve('s3Client')
})
test('Check s3 client', async t => {
  const { s3Client } = t.context
  t.truthy(s3Client)
})
