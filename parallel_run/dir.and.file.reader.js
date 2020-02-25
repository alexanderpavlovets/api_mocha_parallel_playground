const fs = require('fs')
const path = require('path')

function getFilesListFromDirRecursively(pathToDir, filesList = []) {
  if(!fs.statSync(pathToDir).isDirectory()) {
    throw new Error(`No directory found by provided path: ${pathToDir}`)
  }

  const dirContent = fs.readdirSync(pathToDir).map((fileOrDir) => path.resolve(pathToDir, fileOrDir))

  dirContent.forEach((fileOrDir) => {
    if(fs.statSync(fileOrDir).isDirectory()) {
      getFilesListFromDirRecursively(fileOrDir, filesList)
    } else {
      filesList.push(fileOrDir)
    }
  })

  return filesList
}

function getTestsFromFile(pathToFile) {
  const content = fs.readFileSync(pathToFile, 'utf8')

  const testsInFile = content.match(/(?<=it\(('|"))(.*?)(?=('|"),)/g)

  return testsInFile.map(testName => [pathToFile, testName])
}



module.exports = {
  getFilesListFromDirRecursively,
  getTestsFromFile
}