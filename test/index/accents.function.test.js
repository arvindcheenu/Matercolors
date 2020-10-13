import test from 'ava'
import Matercolor from '../../src/index'
test('has four valid accent keys', t => {
  const color = new Matercolor('#FFFFFF').accents('primary')
  t.deepEqual(Object.keys(color), ["A100","A200","A400","A700"])
})