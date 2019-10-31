<template>
  <d2-container>
    <el-row>
      <div class="grid-content bg-purple">
          <el-button type="primary" @click="initSocket">建立websocket连接</el-button>
          <el-button type="primary" @click="webSocketSend">发送消息</el-button>
          <el-button type="primary" @click="close">关闭</el-button> <!--关闭时触发-->
      </div>
    </el-row>
  </d2-container>
</template>
<script>
export default {
  data() {
    return {
      webSocket: null,
      url: 'ws://221.231.13.230:8888/ws/chat/',
      // url: 'ws://192.168.4.14:8000/ws/chat/',
      types: 'test'
    }
  },
  methods: {
    initSocket() {
      let url = `${this.url}`
      this.webSocket = new WebSocket(url)
      this.webSocket.onopen = this.webSocketOnOpen //监听socket连接
      this.webSocket.onclose = this.webSocketOnClose 
      this.webSocket.onmessage = this.webSocketOnMessage //监听socket消息
      this.webSocket.onerror = this.webSocketOnError //监听socket错误信息
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
        "message": "hello world",
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
    },
    close(){
      this.webSocket.close()
      // console.log('websocket连接已关闭');
    },

    //00000000000000-----888888888888888888888888888888888888888888888888888888---以下是网上推荐应用实例
    subscribeTop(command, deptId) { // 获取企业节点车辆在线数
        const data = {
          Command: command,
          CommandType: 'online',
          Token: getToken(),
          Body: {
            TopDeptId: deptId
          }
        }
        if (this.websocket.readyState === 1) {
          this.websocket.send(JSON.stringify(data))
        } else {
          console.log('websocket信息发送失败')
        }
    },

    subscribeExpend(command, commandType, deptId) { // 实时接收已展开过的节点下 车辆上下线通知
        const data = {
          Command: command,
          CommandType: commandType,
          Token: getToken(),
          Body: {
            deptId: deptId
          }
        }
        if (this.websocket.readyState === 1) {
          this.websocket.send(JSON.stringify(data))
        } else {
          console.log('websocket信息发送失败')
        }
    },

    // 以上两个方法会在websocket初始化后，连接成功之后触发，请求页面渲染需要的数据，
    // 下面的方法会在用户点击树节点复选框时触发，会根据不同的请求参数（判断的当前的状态，勾选或取消勾选）
    // 给服务端发送不同请求，服务端返回不同的数据，做不同的操作。
    // 该方法会在用户点击树节点复选框时触发*******
  
    subscribe(command, isdept, id) { // 发送websocket消息，获取车辆或者机构下车辆经纬度信息
        // console.log('-----------subscribe-------command -> ' + command + ' ; isdept -> '+ isdept + ' ; id -> ' + id);
        const data = {
          Command: command,
          CommandType: 'track',
          Token: getToken(),
          Body: {
            isdept: isdept,
            id: id,
            activeStatus: this.activeStatus === -1 ? null : this.activeStatus
          }
        }
        console.log('ws请求参数：', data)
        if (this.websocket.readyState === 1) {
          this.websocket.send(JSON.stringify(data))
          console.log('请求发送成功+++++++')
        } else {
          console.log('websocket信息发送失败')
        }
      },


    // 在websocekt初始化完成，连接成功之后，向服务器发送请求
      
    initWebSocket() {
        // console.log('---------initWebSocket----10-----')
        const vm = this
        vm.websocket = new WebSocket(process.env.WEBSOCKET_API)
        // vm.websocket = new WebSocket('ws://192.168.5.137:****')
        vm.websocket.onopen = function() {
          console.log('websocket连接成功')
          if (vm.topDeptId && vm.topDeptId !== '') {
            //  ***发送请求***
            vm.subscribeTop(5, vm.topDeptId.substring(2))
            vm.subscribeTop(24, vm.topDeptId.substring(2))
            vm.subscribeExpend(4, 'online', vm.topDeptId.substring(2))
          }
        }
        vm.websocket.onmessage = function(evt) {
          // ***接收数据***
          const obj = JSON.parse(evt.data)
          // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + JSON.stringify(obj))
          console.log('222222222222222222=>' + obj.Command)
          // 接收数据之后在这里做下判断，根据后端返回不同的Command指令，做不同的操作
          // websocket.onmessage 是websocket接收数据的方法，这里不过是做了不同的判断而已
          switch (obj.Command) {
            case '15': // 取消订阅,删除在百度地图上渲染的marker图标
              vm.continuecycle=true
              const vehIds = obj.Body.VehIds // 当前订阅节点下的所有数据  vehIds为id数组
              // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + vehIds)
              for (const idx in vehIds) {
                vm.deleteArray(vm.vehicleList, vehIds[idx])
                vm.deleteArray(vm.vehicleIdTmpList, vehIds[idx])
                delete vm.vehicleTmpObj[vehIds[idx]]
              }
              vm.continuecycle=false
              setTimeout(function() {
                for (const idx in vehIds) {
                  vm.deleteArray(vm.vehicleIdTmpList, vehIds[idx])
                  vm.deleteArray(vm.vehicleList, vehIds[idx])
                  delete vm.vehicleTmpObj[vehIds[idx]]
                }
                // console.log('地图数据置空555555555')
              }, 1000)
              // debugger
              break
            case '26': // 订阅->轨迹数据，从返回数据中获取订阅车辆的经纬度，百度地图渲染数据
              // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + obj.vId)
              vm.continuecycle=true
              if (vm.vehicleIdTmpList.indexOf(obj.vId) === -1) {
                vm.vehicleIdTmpList.push(obj.vId)
              }
              // console.log('+++vehicleIdTmpList+++' + vm.vehicleIdTmpList)
              vm.vehicleTmpObj[obj.vId] = obj
              // console.log('+++vehicleTmpObj+++' + JSON.stringify(vm.vehicleTmpObj))
              vm.continuecycle=false

              break
            case '27': // 实时接收已展开过的节点下车辆上下线通知
              // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + JSON.stringify(obj))
              const offlineVeh = obj.Body.Offline
              const onlineVeh = obj.Body.Online
              offlineVeh.forEach(vid => {
                vm.setDataTotree(vm.treeData, vid+'', {online:'0'})
              });

              onlineVeh.forEach(vid => {
                vm.setDataTotree(vm.treeData, vid+'', {online:'1'})
              })
              break
            case '33': // 企业车辆总数,在线数,离线数统计
              // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + JSON.stringify(obj))
              vm.asideObj = obj.Body
              vm.treeData[0].onlineVehicle = obj.Body.onlineVehicle
              vm.treeData[0].allVehicle = obj.Body.allVehicle
              vm.treeData[0].offlineVehicle= obj.Body.allVehicle-obj.Body.onlineVehicle
              break
            case '32': // 获取企业所有节点车辆在线数
              // console.log('['+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()+'] receive command('+obj.Command+') message:' + JSON.stringify(obj))
              const nodeArr = []
              const data = obj.Body
              for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  const obj1 = { id: key, count: data[key] }
                  nodeArr.push(obj1)
                }
              }
              //更新下级机构的车辆总数
              for (let i = 0; i < nodeArr.length; i++) {
                vm.setDataTotree(vm.treeData[0].children, nodeArr[i].id, nodeArr[i].count)
              }
              if (data) {
                vm.deptStatCache = data;
              }
              break
            default:
              break
          }
        }

        // 如果websocekt发生错误，再次进行连接***

        vm.websocket.onerror = function() {
          console.log('---------onerror--20-------')
          vm.initWebSocket()
        }//完整结尾
    },
      

    getBaseTree() { // 树节点数据获取加载方法
        this.deptTreeQuery = { id: '', activeStatus: this.activeStatus==-1?'':this.activeStatus }
        
        getBaseDept(this.deptTreeQuery).then(res => { // 加载机构树顶级节点
          if (res.code === 0) {
            // console.log(res)
            if (this.websocket.readyState === 1) {
              this.subscribeTop(24, res.data[0].id.substring(2))
              this.subscribeTop(5, res.data[0].id.substring(2))
              this.subscribeExpend(4, 'online', res.data[0].id.substring(2))
            }
            this.topDeptId = res.data[0].id
            this.treeData = res.data
            // console.log('-----------getBaseDept---------' + JSON.stringify(this.treeData))
            this.$set(this.treeData[0], 'allVehicle', res.data.allCount)
            this.$set(this.treeData[0], 'onlineVehicle', res.data.onlineVehicle)
            this.$set(this.treeData[0], 'offlineVehicle', res.data.allCount-res.data.onlineVehicle)
            this.$set(this.treeData[0], 'children', [])
            this.treeData[0].children.push({})
          } else {
            this.$message({ message: res.msg, type: 'error' })
          }
        })
      },
      
      initLocation() { // 获取localStoragesh数据方法
        if (window.localStorage) {
          const storage = window.localStorage
          const address = storage.getItem('userDeptArea')
          // console.log(address)
          this.mapCenter = address
        }
      },      

      // setInterval(() => {
      //   this.pushVehToMap() // 百度地图渲染方法，页面挂载完成调用，每0.5秒调用一次
      // }, 500 )

    }, 

    getCurrentKey(data, node) { // 获取当前选中节点的key 复选框点击 data数据为当前点击复选框的内容 id等
        const id = data.id.substring(2)
        this.checkedList = node.checkedKeys
        if (this.checkedList.indexOf(data.id) > -1) {
          if (data.type === '3') {
            this.clickVehId = id
            this.subscribe(1, 1, id)
          } else {
            this.subscribe(1, 0, id)
          }
        } else {
          if (data.type === '3') {
            this.clickVehId = id
            if (id === this.vehicleInfo.vId + '') {
              this.isShowDialog = false
            }
            this.subscribe(15, 1, id)
            this.deleteArray(this.vehicleList, data.id.substring(2))
          } else {
            this.subscribe(15, 0, id)
            const vehicleArray = []
            const arr = this.getSelectArr(vehicleArray, this.treeData[0].children, data.id)
            for (let i = 0; i < arr.length; i++) {
              this.deleteArray(this.vehicleList, arr[i].id.substring(2))
            }
          }
        }
    },

    created() {
      // this.initSocket()
    },
    destroyed() {
      if (this.WebSocket){ //WebSocket存在时,才能关闭
        this.webSocket.close()
      }
    }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
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
