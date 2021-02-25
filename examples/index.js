const Matercolor = require ('../dist/index.js');
const purple = new Matercolor ('#6200EE');
console.log ('\n\n PALETTE OBJECT\n\n');
console.log (purple);
// VALID ACCESSES
console.log ('1', purple.P500); // #6200ee
console.log ('3', purple[500]); // #6200ee
console.log ('3', purple['500']); // #6200ee
console.log ('4', purple['P500']); // #6200ee
console.log ('5', purple.p200 ().large ().contrastColor ('self')); // #6200ee
console.log ('6', purple.p200 ().large ().greedy ().contrastColor ('self')); // #0000d6
console.log ('7', purple.p200 ().contrastColor ()); // #000000
console.log ('8', purple.p400 ().contrastColor ()); // #ffffff
console.log ('9', purple.p300 ().is ()); // 6 #9965f4
console.log ('10', purple.p300 ().contrastColor ('#f4df65')); // #fefae4
console.log ('11', purple.p300 ().contrastColor ('self')); // #efe5fd
console.log ('12', purple.p300 ().AAA ().greedy ().contrastColor ('self')); // #c4f68d
console.log ('13', purple.c200 ().root ().palette ('p')[800]); // #6bb23b
console.log ('14', purple.c200 ().root ().palette ('c')[800]); // #6bb23b
console.log ('15', purple.c200 ().root ().palette ('a').secondary[800]); // #6bb23b
console.log ('16', purple.c200 ().root ().palette ('t').primary[400]); // #00e290
console.log ('17', purple.c200 ().root ().P700); // 8 #5b00c1
console.log ('18', purple.c200 ().root ().p900 ().contrastColor ()); // 9 #ffffff
console.log ('19', purple.AA ().large ().contrastColor ('self')); // 12 #f5ecfd
console.log ('20', purple.AA ().p200 ().large ().contrastColor ('self')); // 12 #0000d6
// ACCESSES NOT RECOMMENDED
console.log ('21', purple.P700 === purple.c200 ().P700); // 10 true : not recommended as its semantically meaningless.
console.log ('22', purple.is () === purple.c200 ().is ()); // 11 true : not recommended as its semantically meaningless.
// INVALID ACCESSES
// console.log ('6', purple.500);
//console.log( '7', purple[ 500 ].contrast());
//console.log ('9', purple.P500.contrast ());
