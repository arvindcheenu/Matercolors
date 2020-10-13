import test from 'ava'
import Matercolor from '../../src/index'
test('has four valid accent keys', t => {
  const color = new Matercolor('#FFFFFF').shades('primary')
  t.deepEqual(Object.keys(color), ["light","main","dark"])
})