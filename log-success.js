const { logSuccess } = require('./tools/js')

const msg = process.argv.slice(2)
if (msg) logSuccess(msg)
