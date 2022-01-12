import test from 'ava'
import map from './map.json'

test('Check attribute map', async t => t.snapshot(map, 'Attribute mapping has changed'))
