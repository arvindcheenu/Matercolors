import test from 'ava'
const mockKd = [[0, 0, 0], [155, 23, 0], [40, 134, 50]]
const mockKdA = [[1, 1, 1], [255, 13, 1], [80, 245, 100]]
function mockPaletteGenerator (_, B, accent) {
  const refPalletes = accent ? mockKdA : mockKd
  const b = B === undefined ? refPalletes : B
  return b
}
test('sets input as refPallete if defined', t => {
  t.deepEqual(mockPaletteGenerator(10, [[1, 1, 1]], false), [[1, 1, 1]])
})
test('sets Kd as refPallete if undefined and not accent', t => {
  t.is(mockPaletteGenerator(10, undefined, false), mockKd)
})
test('sets KdA as refPallete if undefined and accent', t => {
  t.is(mockPaletteGenerator(10, undefined, true), mockKdA)
})
