<template>
  <d2-container class="mod-sys__user">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.username" :placeholder="$t('user.username')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button >{{ $t('query') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="exportExcel()">{{ $t('export') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      :data="dataList.slice((page-1)*limit,page*limit)"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="username" :label="$t('user.username')" sortable="custom" width="150" header-align="center" align="center"/>
      <el-table-column prop="role_name" label="角色名称" header-align="center" width="150" align="center"/>
      <el-table-column prop="real_name" label="真实姓名" header-align="center" width="150" align="center"/>
      <el-table-column prop="email" :label="$t('user.email')" header-align="center" width="150" align="center"/>
      <el-table-column prop="phone" label="手机号" header-align="center" align="center"/>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle  @click="addOrUpdateHandle(scope.row.id)"></el-button>
          <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle @click="deleteUser(scope.row.id)"></el-button>
          <el-button type="warning" title="角色列表" size="mini" icon="el-icon-share" circle @click="openUserRoleDialog(scope.row.id,scope.row.username)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <!-- 对话框 -->
      <el-dialog :visible.sync="userRoleDialogVisible" >
      <div slot="title">维护<el-tag>{{username}}</el-tag>角色</div>
        <el-table :data="roleInfo"  size="small" stripe highlight-current-row style="width: 100%;" >
            <el-table-column label="名称"prop="name" sortable="custom">
              <template slot-scope="scope"> {{scope.row.name}} </template>
            </el-table-column>

            <el-table-column label="标识" prop="code" sortable="custom" :show-overflow-tooltip="true" >
              <template slot-scope="scope"> {{scope.row.code}} </template>
            </el-table-column>

            <el-table-column label="描述" prop="description" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{scope.row.description}} </template>
            </el-table-column>
            
            <el-table-column label="状态" prop="isAdd">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.isAdd" size="mini" type="success">已添加</el-tag>
                <el-tag v-if="!scope.row.isAdd" size="mini" type="info">未添加</el-tag>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.isAdd" type="primary" title="添加" size="mini" icon="el-icon-plus" circle
                  @click="modifyRoleUser(scope.row.id,0)"></el-button>
                
                <el-button v-if="scope.row.isAdd" type="danger" title="移除" size="mini" icon="el-icon-minus" circle
                  @click="modifyRoleUser(scope.row.id,1)"></el-button>
              </template>
            </el-table-column>

    </el-table>
      </el-dialog>
    <!-- 分页 -->
    <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './user-add-or-update'
// import userRole from "./userRole"
import { cookieGet } from '@/common/cookie'

export default {
  mixins: [ mixinViewModule ],
  name: "user",
  components: {
    AddOrUpdate,
    // userRole
  },
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/sys/user',
        getDataListIsPage: true,
        deleteURL: '/api/sys/user',
        deleteIsBatch: true,
      },
      // dialogVisible: false,
      dataForm: {
        id: ''
      },
      dataList:[],
      roleInfo:[],
      radio:'',
      role_id:'',
      roleForm:{
        role_id:'',
        role_name:''
      },    
      userRoleDialogVisible: false,
      temp:'',
      user_id:'',
      username:'',
    }
  },
  mounted(){
  },
  methods:{
    deleteUser(id) { //删除一条用户信息
      console.log("删除")
      console.log(id)
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(
        () => {
        this.$axios.delete(`/api/sys/user/${id}`).then(res=>{
          console.log("-----888")
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 500,
          })
          this.getDataList()
        });
      });
    },
    mainRoleInfo(){
      // this.dialogVisible = false
      this.roleForm.role_id = this.role_id
      this.roleForm.role_name = this.radio
      this.$axios.get(`/sys/camerarecord?token=${cookieGet('token')}`,{
          ...this.roleForm
        }).then(res =>{
          console.log(res)
        }).catch(() => {
          console.log("7777777777777777777777777")
        })
    },
    openUserRoleDialog(user_id,username){
      console.log("打开角色列表后获得")
      console.log(user_id)
      console.log(username)
      this.username = username
      this.user_id = user_id
      this.userRoleDialogVisible = true;
      this.$axios.get(`/api/list-user-of-roles/${user_id}`)//获取系统当前所有权限
        .then(res => {
          console.log("当前所有角色信息")
          console.log(res)
          this.roleInfo = res
          console.log("当前所有角色信息")
        })
        .catch(() => {})
    },
    modifyRoleUser(roleId,action){
      console.log("lal--")
      console.log(this.user_id)
      console.log(roleId)
      console.log(action)
      if(action){
        this.$axios.delete(`/api/user_role`, {data:{'user_id':this.user_id, 'role_id':roleId}})
        .then(() => {
            this.$notify({
              title: "操作成功",
              message: "已移除",
              type: "success"
            }); 
        });
      }else{
        this.$axios.put(`/api/user_role`,{}, {data:{'user_id':this.user_id, 'role_id':roleId}})
        .then(( )=> {
            this.$notify({
              title: "操作成功",
              message: "已添加",
              type: "success"
            });
        });
      }
      this.$axios.get(`/api/list-user-of-roles/${this.user_id}`)//获取系统当前所有权限
      .then(res => {
        console.log("0000000000")
        console.log(res)
        this.roleInfo = res
        console.log("00000000")
      })
      .catch(() => {})   
    },
  },
  
}
</script>
