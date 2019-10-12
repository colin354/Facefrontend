<template>
  <d2-container>
    <el-row>
      <div class="grid-content bg-purple">
          <el-button type="primary" @click="initSocket">建立websocket连接</el-button>
          <el-button type="primary" @click="webSocketSend">发送消息</el-button>
          <el-button type="primary" @click="webSocketOnClose">关闭</el-button>
      </div>
    </el-row>
  </d2-container>
</template>
<script>
export default {
  data() {
    return {
      webSocket: null,
      url: 'ws://10.2.155.139:8888/ws/chat/',
      types: 'test'
    }
  },
  methods: {
    initSocket() {
      let url = `${this.url}`
      this.webSocket = new WebSocket(url)
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onclose = this.webSocketOnClose
      this.webSocket.onmessage = this.webSocketOnMessage
      this.webSocket.onerror = this.webSocketOnError
    },
    // 建立连接成功后的状态
    webSocketOnOpen() {
      console.log('websocket连接成功');
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      // res就是后台实时传过来的数据
      console.log(res);
      const obj = JSON.parse(res.data)
      console.log(obj.message)
      console.log(obj.command)
    },
    webSocketSend(Data) {
    //数据发送
      let message = {
        "message": "hello world"
      }
      this.webSocket.send(JSON.stringify(message));    
    },
    // 关闭连接
    webSocketOnClose() {
      console.log('websocket连接已关闭');
    },
    //连接失败的事件
    webSocketOnError(res) {
    console.log('websocket连接失败');
    // 打印失败的数据
    console.log(res);
    }
  },
  created() {
    // this.initSocket()
  },
  destroyed() {
    this.webSocket.close()
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
