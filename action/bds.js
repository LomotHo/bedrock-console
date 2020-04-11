
// bdsProcess.stdout.pipe(process.stdout);
// bdsProcess.stderr.pipe(process.stdout);
const spawn = require('child_process').spawn,
bdsProcess = spawn('./bedrock_server', [], {cwd: './bedrock'});

module.exports = function() {
  // TODO
  // bdsProcessManager
  // .start .stop .restart .status

  // processInit = () => {
  //   // const spawn = require('child_process').spawn,
  //   // bdsProcess = spawn('./bedrock_server', [], {cwd: './bedrock'});
  //   this.bdsProcess = bdsProcess;
  //   return bdsProcess;
  // };

  this.getProcess = () => {
    // if (!this.bdsProcess){
    //   processInit();
    // }
    return bdsProcess;
  };

  this.writeCmd = (msg) => {
    bdsProcess.stdin.write(msg+'\n');
  }
}
