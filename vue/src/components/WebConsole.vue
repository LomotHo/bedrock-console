<template>
  <div>
    <div class="web-console">
      <ul id="webconsole" class="console-text">
        <p class="item" v-for="webConsoleLogItem in webConsoleLog" >
          {{webConsoleLogItem}}
        </p>
      </ul>
    </div>

    <el-input placeholder="输入命令" v-model="webConsoleInput"  @keyup.enter.native="onSubmicCmd()" @keyup.up.native="lastInput()" @keyup.down.native="nextInput()" class="web-console-input">
      <el-button slot="append" @click="onSubmicCmd()">Enter</el-button>
    </el-input>

  </div>
</template>

<script>
export default {
  name: 'WebConsole',
  props: {
    msg: String
  },
  data() {
    this.sockets.subscribe('log', (data) => {
        this.webConsoleLog.push(`[server] ${data}`);
        this.$nextTick(function() {
          this.consoleScrollEnd();
        })
    })
    var webConsoleLog = []
    return {
      webConsoleInput: '',
      webConsoleLog,
      lastInputStr: ''
    }
  },
  destroyed () {
    console.log("webconsole destoried");
  },
  methods: {
    onSubmicCmd() {
      console.log("onSubmicCmd() trger");
      if(this.webConsoleInput!=''){
        console.log(`webConsoleInput: ${this.webConsoleInput}`);
        this.$socket.emit('cmd', { cmd: this.webConsoleInput});
        this.lastInputStr = this.webConsoleInput;
        this.webConsoleLog.push(`=> ${this.webConsoleInput}`);
        this.webConsoleInput = '';
        this.$nextTick(function() {
          this.consoleScrollEnd();
        })
      }
    },
    lastInput() {
      this.webConsoleInput = this.lastInputStr;
    },
    nextInput() {
      this.webConsoleInput = '';
    },
    consoleScrollEnd() {
      document.getElementById("webconsole").scrollTop=100000;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.web-console-input {
  font-family: 'DejaVu Sans Mono', 'Everson Mono', FreeMono, Menlo, Terminal, monospace;
}

.web-console {
  // background-color: rgb(25, 34, 39);
  .console-text {
    // theme
    background-color: rgb(38, 50, 56);
    color: gainsboro;
    font-family: 'DejaVu Sans Mono', 'Everson Mono', FreeMono, Menlo, Terminal, monospace;

    // windows
    padding: 4px 8px;
    border-style: solid;
    border-width:1px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 350px;
    overflow:auto;
    text-align: left;
    font-size: 14px;

    .item {
      line-height: 14px;
      margin: 6px 0;
    }
  }
}


</style>
