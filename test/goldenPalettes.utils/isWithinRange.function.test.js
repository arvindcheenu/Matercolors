import test from 'ava'
const mockIsWithinRange = (num, max, term) => {
  if (Number.isNaN(num) || num < 0 || num > max) throw new RangeError(`${num} for ${term} is not between 0 and ${max}`)
}
test('10 lies within (0,12)', t => {
  t.is(mockIsWithinRange(10, 12, 'x'), undefined)
})
test('16 does not lie within (0,12)', t => {
  t.throws(() => mockIsWithinRange(16, 12, 'x'), {
    instanceOf: RangeError,
    message: '16 for x is not between 0 and 12'
  })
})
