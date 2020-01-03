<template>
  <d2-container class="mod-sys__user">
    <template slot="header">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="名称" style="width: 100px;" />
        </el-form-item>

        <el-form-item label="标识" prop="code">
          <el-input v-model="searchForm.code" placeholder="标识" style="width: 120px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">
            <d2-icon name="search" /> 查询
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="">
            <d2-icon name="refresh" /> 重置
          </el-button>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addOrUpdateHandle()">
          新增角色
        </el-button>
      </el-form>
    </template>

    <el-button v-if="multipleSelection.length>0" type="danger" size="mini" icon="el-icon-delete" @click="">
      删除
    </el-button>
    <el-table :data="dataList.slice((page-1)*limit,page*limit)" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="角色名称" prop="name" sortable="custom">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="角色标识" prop="code" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column label="角色描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column label="角色操作">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle @click="addOrUpdateHandle(scope.row.id)"></el-button>
          <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle @click="delRole(scope.row.id)"></el-button>
          <el-button type="warning" title="用户列表" size="mini" icon="el-icon-share" circle @click="openRoleUserDialog(scope.row)"></el-button>
          <el-button title="权限" size="mini" icon="el-icon-setting" circle @click="openPermissionDialog(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <role-permission :role="role" v-model="permissionDialogVisible" />
    <role-user :role="role" v-model="roleUserDialogVisible" />
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
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
import AddOrUpdate from './permission-add-or-update'
import roleUser from "./roleUser"
import rolePermission from "./rolePermission";

export default {
  mixins: [ mixinViewModule ],
  name: "userPermission",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/api/role', //默认加载当前权限列表
        getDataListIsPage: true,
        deleteURL: '/api/role',
        deleteIsBatch: true,
      },
      dataForm: {
        username: ''
      },
      searchForm: {},
      loading: false,
      tableData: [],
      multipleSelection: [],
      role: { id: "", name: "" },
      editFormVisible: false,
      permissionDialogVisible: false,
      roleUserDialogVisible: false
    }
  },
  components: {
    AddOrUpdate,
    roleUser,
    rolePermission
  },
  mounted() {
  },
  methods: { 
    delRole(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(
        () => {
        this.$axios.delete(`/api/role/${id}`).then(res=>{
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
    // batchDel() {
    //   this.$confirm("确认删除？", "确认信息", {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: "删除",
    //     cancelButtonText: "取消"
    //   }).then(() => {
    //     roleService
    //       .delRoles({
    //         ids: JSON.stringify(this.multipleSelection.map(s => s.id))
    //       })
    //       .then(() => {
    //         this.getTableData();
    //       });
    //   });
    // },
    openEditForm(role) {
      this.role = role;
      this.editFormVisible = true;
    },
    openPermissionDialog(role) {
      this.role = role;
      this.permissionDialogVisible = true;
    },
    openRoleUserDialog(role) {
      this.role = role;
      this.roleUserDialogVisible = !this.roleUserDialogVisible;
    }
  }
}
</script>
