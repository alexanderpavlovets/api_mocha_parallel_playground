const {runMochaInParallel, getFilesListFromDirRecursively} = require('./parallel_run')

function createMochaCommand(pathToSpecFile) {
  return `node ./node_modules/.bin/mocha ${pathToSpecFile}\
  --reporter mochawesome\
  --reporter-options reportDir=report,reportFilename=report${getRandomString()}\
  --timeout 3000`
}

const commandsList = getFilesListFromDirRecursively('./specs').map(createMochaCommand)
const threadsCount = 5

const config = {
  commandsList,
  threadsCount
}

runMochaInParallel(config)


function getRandomString(params = {}) {
  const {length = 10, chars = 'allChars'} = params;
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  const symbols = {
    allChars,
    numbers: allChars.match(/[0-9]+/)[0],
    letters: allChars.match(/[a-zA-Z]+/)[0]
  };

  for (let i = 0; i < length; i++) {
    result += symbols[chars].charAt(Math.floor(Math.random() * symbols[chars].length));
  }
  return result;
}

// Mochawesome report combination:
// https://github.com/testdrivenio/cypress-mochawesome-s3/blob/master/scripts/combine.js
