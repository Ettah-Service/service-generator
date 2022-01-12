#!/usr/bin/env node
import { tap, split, length, values, compose, trim, toString, fromJson, path } from '@meltwater/phi'
import { inspect } from 'util'
import { resolve } from 'path'
import { map as mapAwait } from 'awaiting'
import { readFileSync } from 'fs'
import config from '../config'
import createDynamodbClient  from '../lib/util/client/dynamodb'

const tp = split('.')
const getSchema = compose(fromJson, trim, toString, readFileSync)
const runner = async () => {
  const tables = values(path(tp('dynamodb.table'), config))
  const seedingEnabled = path(tp('dynamodb.seedingEnabled'), config)
  const dynamoClient = createDynamodbClient({ config })
  await mapAwait(tables, length(tables), async tableName => {
    const schemaPath = resolve(`${process.cwd()}/fixtures/db/schema/${tableName}.json`)
    const schema = getSchema(schemaPath)
    await dynamoClient.createTable(schema).promise()
  })
  return {
    serviceName: 'Dyanmodb',
    meta: {
      tables,
      seedingEnabled
    }
  }
}

Promise.resolve()
  .then(() => console.time('Setting up dynamodb'))
  .then(runner)
  .then(tap(val => console.log(inspect(val, false, null, true))))
  .then(() => console.timeEnd('Setting up dynamodb'))
  .catch((error) => {
    console.error(error)
  })