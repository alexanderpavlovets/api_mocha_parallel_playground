const {exec} = require('child_process')

function execWrap(command) {
  return new Promise((resolve, reject) => {
    const proc = exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('**************************')
        console.log(`ERROR in exec: ${err}`)
        console.log(`STDOUT of exec: ${stdout}`)
        console.log('**************************\n')
      } else {
        console.log('**************************')
        console.log(`STDOUT of exec: ${stdout}`)
        console.log('**************************\n')
      }
    })
    
    proc.on('close', (code, signal) => {
      // code === 0 ? resolve(null) : resolve(command)
      resolve()
    })
  })
}

module.exports = {
  execWrap
}