export const EPS = 1e-7;
export const MAX_ITER = 20;
export const TwoE16 = 2 ** 16;
export const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const TypeList = [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Undefined',
  'Null',
];

var classToType = {};
for (var i = 0; i < TypeList.length; i += 1) {
  var name = TypeList[i];
  classToType['[object ' + name + ']'] = name.toLowerCase ();
}
export const type = function (obj) {
  return classToType[Object.prototype.toString.call (obj)] || 'object';
};
