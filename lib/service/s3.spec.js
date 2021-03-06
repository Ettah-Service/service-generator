import test from 'ava'
import {
  createPutToS3,
  createGetFromS3,
  createListFromS3,
  createDeleteFromS3
} from './s3'
import config from '../../config'

test.beforeEach(async t => {
  const fakeS3ResponseAfterUpload = ({ etag: 'EEEEE' })
  const fakeS3GetResponse = ({ Body: 'Body of object' })
  const fakes3ListResponse = ({ Contents: [] })
  const fakeS3ResponseAfterDelete = ({ etag: 'EEEEE' })
  const createFakeS3Client = () => ({
    putObject: () => ({ promise: () => Promise.resolve(fakeS3ResponseAfterUpload) }),
    getObject: () => ({ promise: () => Promise.resolve(fakeS3GetResponse) }),
    listObjectsV2: () => ({ promise: () => Promise.resolve(fakes3ListResponse) }),
    deleteObject: () => ({ promise: () => Promise.resolve(fakeS3ResponseAfterDelete) })
  })
  t.context.fakeS3Client = createFakeS3Client()
  t.context.config = config
})

test('Check put to s3', async t => {
  const { fakeS3Client: s3Client, config } = t.context
  t.truthy(createPutToS3)
  const putToS3 = createPutToS3({ s3Client, config })
  const resp = await putToS3('sample-s3-key.json', { key: 'sampleValue' })
  t.truthy(resp)
})

test('Check get from s3', async t => {
  const { fakeS3Client: s3Client, config } = t.context
  t.truthy(createGetFromS3)
  const getFromS3 = createGetFromS3({ s3Client, config })
  const resp = await getFromS3('sample-s3-key.json')
  t.truthy(resp)
})

test('Check list from s3', async t => {
  const { fakeS3Client: s3Client, config } = t.context
  t.truthy(createListFromS3)
  const listFromS3 = createListFromS3({ s3Client, config })
  t.truthy(await listFromS3())
  t.truthy(await listFromS3(null, { startAfter: 'previousObjectId' }))
  t.truthy(await listFromS3('./', { startAfter: 'previousObjectId' }))
})

test('Check delete from s3', async t => {
  const { fakeS3Client: s3Client, config } = t.context
  t.truthy(createDeleteFromS3)
  const deleteFromS3 = createDeleteFromS3({ s3Client, config })
  const resp = await deleteFromS3('sample-s3-key.json')
  t.truthy(resp)
})
