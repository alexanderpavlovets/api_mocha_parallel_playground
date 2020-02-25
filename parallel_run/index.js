const {getFilesListFromDirRecursively, getTestsFromFile} = require('./dir.and.file.reader')
const {runMochaInParallel} = require('./runner')

module.exports = {
  getFilesListFromDirRecursively,
  runMochaInParallel,
  getTestsFromFile
}