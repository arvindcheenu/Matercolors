const Matercolor = require('../dist/index.js')
const Purple = new Matercolor('#6200EE', { showContrastText: true })
console.log('\n\n PALETTE OBJECT\n\n')
console.log(JSON.stringify(Purple, null, 2))
