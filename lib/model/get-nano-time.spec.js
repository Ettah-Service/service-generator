import test from 'ava'
import { getMicroseconds, getNanoseconds } from './get-nano-time'

test.beforeEach(t => {
  t.context.timestamp = 1609402752115
  t.context.hrtime = [385365, 862575748]
})
test('Check get nano/micro seconds from fixed time and hrtime', async t => {
  const { timestamp, hrtime } = t.context
  t.snapshot(getMicroseconds(timestamp, hrtime))
  t.snapshot(getNanoseconds(timestamp, hrtime))

  t.truthy(getMicroseconds())
  t.truthy(getNanoseconds())
})
