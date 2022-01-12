import test from 'ava'
import { readFileSync } from 'fs'
import { compose, toString } from '@meltwater/phi'

test('Check serverless.yml has not changed', async t => {
  const getYml = compose(toString, readFileSync)
  t.snapshot(getYml(`${process.cwd()}/serverless/yml/api.yml`))
  t.snapshot(getYml(`${process.cwd()}/serverless/yml/env/prod.yml`))
  t.snapshot(getYml(`${process.cwd()}/serverless/yml/head.yml`))
  t.snapshot(getYml(`${process.cwd()}/serverless/yml/env/local.yml`))
  t.snapshot(getYml(`${process.cwd()}/serverless/yml/tail.yml`))
})
