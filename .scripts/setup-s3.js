#!/usr/bin/env node
import { tap, path, split, length } from '@meltwater/phi'
import { inspect } from 'util'
import { map as mapAwait, success } from 'awaiting'
import config from '../config'
import createS3Client from '../lib/util/client/s3'

const tp = split('.')
const runner = async () => {
  const s3Client = createS3Client({ config })
  const buckets = [path(tp('s3.bucket'), config)]
  await mapAwait(buckets, length(buckets), bucketName => success(s3Client.createBucket({ Bucket: bucketName }).promise()))
  return { serviceName: 'S3', meta: { buckets } }
}

Promise.resolve()
  .then(() => console.time('Setting up s3'))
  .then(runner)
  .then(tap(val => console.log(inspect(val, false, null, true))))
  .then(() => console.timeEnd('Setting up s3'))
  .catch(error => {
    console.error(error)
  })
