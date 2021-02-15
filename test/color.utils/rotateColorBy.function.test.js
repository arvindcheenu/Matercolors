import test from 'ava'
import { rotateColorBy } from '../../src/color.utils'
test('computes valid hue if r > g > b', t => {
  t.is(rotateColorBy('#f58742', 180), '#42b0f5')
})
test('computes valid hue if r > b > g', t => {
  t.is(rotateColorBy('#f54287', 180), '#42f5b0')
})
test('computes valid hue if g is greatest', t => {
  t.is(rotateColorBy('#87f542', 180), '#b042f5')
})
test('computes valid hue if b is greatest', t => {
  t.is(rotateColorBy('#4287f5', 180), '#f5b042')
})
