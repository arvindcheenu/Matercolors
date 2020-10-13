import test from "ava"
import { getComplementary } from "../../src/color.utils"
test('computes valid hue if r > g > b', t => {
  t.is(getComplementary("#f58742"), "#42b0f5")
})
test('computes valid hue if r > b > g', t => {
  t.is(getComplementary("#f54287"), "#42f5b0")
})
test('computes valid hue if g is greatest', t => {
  t.is(getComplementary("#87f542"), "#b042f5")
})
test('computes valid hue if b is greatest', t => {
  t.is(getComplementary("#4287f5"), "#f5b042")
})