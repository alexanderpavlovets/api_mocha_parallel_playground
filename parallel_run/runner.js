const { execWrap } = require('./exec.wrap')

const sleep = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms))

async function runMochaInParallel(options) {
  const { commandsList, threadsCount } = options
  let busyThreadsCounter = 0

  async function runOneTest() {
    // console.log('_________________________________ Attempt to run test _________________________________')
    // console.log(`_________________________________ Busy threads now are: ${busyThreadsCounter}_________________________________`)
    // console.log(`_________________________________ Commands to run left: ${commandsList.length} _________________________________`)
    if (commandsList.length && busyThreadsCounter < threadsCount) {
      busyThreadsCounter++
      await execWrap(commandsList.splice(0, 1)[0]) // splice(0, 1)[0] = take first element, also remove it from initial array
      busyThreadsCounter--
    }
  }

  // Will add new threads
  const watcher = setInterval(runOneTest, 100)

  do {
    await runOneTest()
    // || busyThreadsCounter - because we need to stay in the main function, untill all threads are done
    if (commandsList.length || busyThreadsCounter) { 
      await sleep()
    }
  } while (commandsList.length || busyThreadsCounter)

  clearInterval(watcher)
}

module.exports = {
  runMochaInParallel
}