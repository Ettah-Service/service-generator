#!/usr/bin/env node
import { inspect } from 'util'
import { tap, compose, toString, length, filter, includes, fromJson } from '@meltwater/phi'
import flattenDir from 'flatten-dir'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { map as mapAwait } from 'awaiting'
import config from '../config'
import createDynamodbClient from '../lib/util/client/dynamodb'

const getSchemaJson = compose(fromJson, toString, readFileSync)
const createGetFileContent = () => fileName => ({ fileName, schema: getSchemaJson(fileName) })
const createDynamodbDatabase = dynamoClient => async ({
  fileName,
  schema
}) => ({
  fileName,
  result: await (dynamoClient.createTable(schema).promise())
})

const runner = async () => {
  const { s3: { bucket: bucketName } } = config
  const dynamoClient = createDynamodbClient({ config })
  const dirName = resolve(process.cwd(), 'fixtures')
  const allFiles = await flattenDir(dirName)
  const files = filter(includes('/db/schema/'), allFiles)
  const result = await mapAwait(
    files,
    length(files),
    compose(createDynamodbDatabase(dynamoClient), createGetFileContent(dirName)))
  return ({
    service: 'Upload:Template',
    task: 'Create all dynamodb tables',
    meta: { bucketName, result }
  })
}
Promise.resolve()
  .then(() => console.time('Setting up dynamodb'))
  .then(runner)
  .then(tap(val => console.log(inspect(val, false, null, true))))
  .then(() => console.timeEnd('Setting up dynamodb'))
  .catch((error) => {
    console.error(error)
  })
