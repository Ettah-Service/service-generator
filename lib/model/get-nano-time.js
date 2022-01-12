import { defaultTo } from '@meltwater/phi'
import bigInt from 'big-integer'

export function getNanoseconds (seedMs = new Date().getTime(), seedNs = process.hrtime()) {
  const diffNs = defaultTo(process.hrtime(), seedNs)
  return bigInt(seedMs)
    .times(1e6)
    .add(bigInt(diffNs[0])
      .times(1e9)
      .plus(diffNs[1]))
    .toString()
}

export function getMicroseconds (seedMs = new Date().getTime(), seedNs = process.hrtime()) {
  return bigInt(getNanoseconds(seedMs, seedNs))
    .divide(1e3)
    .toString()
}
