import test from "ava"
import { RGBToHSL } from "../../src/color.utils"
test('computes valid HSL if r is greatest', t => {
  t.deepEqual(RGBToHSL({r: 30, g: 20, b: 10}), {h: 30, s: 50, l: 7.8, string: 'hsl(30,50%,7.8%)'})
})
test('computes valid HSL if g is greatest', t => {
  t.deepEqual(RGBToHSL({r: 10, g: 30, b: 20}), {h: 150, s: 50, l: 7.8, string: 'hsl(150,50%,7.8%)'})
})
test('computes valid HSL if b is greatest', t => {
  t.deepEqual(RGBToHSL({r: 10, g: 20, b: 30}), {h: 210, s: 50, l: 7.8, string: 'hsl(210,50%,7.8%)'})
})