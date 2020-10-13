import test from 'ava'
import Matercolor from '../../src/index'
test('fails on empty constructor', t => {
  const err = t.throws(() => new Matercolor(), { instanceOf: RangeError })
  t.true(err.message.includes('NaN for lightness is not between'))
})
test('valid constructor has four keys', t => {
  const color = new Matercolor('#FFFFFF')
  t.is(Object.keys(color).length, 4)
})
test('fails on invalid hex', t => {
  const err = t.throws(() => new Matercolor('#GGEEFF'), { instanceOf: RangeError })
  t.true(err.message.includes('NaN for lightness is not between'))
})
test.todo('supports triple hex codes')
