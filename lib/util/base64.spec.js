import { compose } from '@meltwater/phi'
import test from 'ava'
import {
  toAscii,
  toBase64
} from './base64'

test('Check convert toAscii', async t => {
  const roundTrip = compose(toAscii, toBase64)
  t.is('sampleText', roundTrip('sampleText'))
})
