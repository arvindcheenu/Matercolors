import test from "ava"
import { componentToHex } from "../../src/color.utils"
test('left pads zero if single digit hex', t => {
  t.is(componentToHex("f"), "0f")
})