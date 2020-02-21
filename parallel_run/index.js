const {getFilesListFromDirRecursively} = require('./read.nested.dirs')
const {runMochaInParallel} = require('./runner')

module.exports = {
  getFilesListFromDirRecursively,
  runMochaInParallel
}