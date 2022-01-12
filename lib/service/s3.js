import { success } from 'awaiting'
import createLogger from '../util/logger'
import {
  always,
  assoc,
  cond,
  defaultTo,
  identity,
  prop,
  T,
  toJson,
  when,
  is,
  isNilOrEmpty
} from '@meltwater/phi'

export const createPutToS3 = ({ s3Client, config }) => async (key, payload, { bucket, metadata = {} } = {}) => {
  const { s3: { bucket: Bucket } } = config
  const log = createLogger('S3:put')
  const res = await s3Client.putObject({
    Bucket: defaultTo(Bucket)(bucket),
    Key: key,
    Body: cond([
      [is(Buffer), identity],
      [is(Object), toJson],
      [T, identity]
    ])(payload),
    Metadata: when(isNilOrEmpty, always(null))(metadata)
  }).promise()
  log('Done putting to s3', res)
  return { ...res, key }
}

export const createGetFromS3 = ({ s3Client, config }) => async (key, bucket) => {
  const { s3: { bucket: defaultBucket } } = config
  const log = createLogger('S3:get')
  log('Getting item from s3 using', key)
  const Bucket = defaultTo(defaultBucket)(bucket)
  return s3Client.getObject({ Bucket, Key: key })
    .promise()
}

export const createListFromS3 = ({ s3Client, config }) => async (prefix = '', options = {}) => {
  const log = createLogger('S3:list')
  log('About to list items from s3')
  const { s3: { bucket: Bucket } } = config
  const startAfter = defaultTo(undefined)(prop('startAfter', options))
  const _params = { Bucket, Prefix: prefix }
  const params = when(always(startAfter), assoc('StartAfter', startAfter))(_params)
  return s3Client.listObjectsV2(params).promise()
}

export const createDeleteFromS3 = ({ s3Client, config }) => async (key, bucket) => {
  const { s3: { bucket: Bucket } } = config
  const log = createLogger('S3:delete')
  await success(s3Client.deleteObject({ Bucket: defaultTo(Bucket)(bucket), Key: key })
    .promise())
  log('Done deleting from s3')
  return true
}
