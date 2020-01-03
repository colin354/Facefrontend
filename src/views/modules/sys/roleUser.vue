<template>
  <el-dialog :visible.sync="dialogVisible" @open="dialogOpen">
    <div slot="title">维护 <el-tag>{{role.description}}  </el-tag>用户</div>
    <!-- <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
      <el-form-item label="名称" prop="name"> <el-input v-model="searchForm.name" placeholder="名称" style="width: 100px;" /> </el-form-item>
      <el-form-item label="邮箱" prop="email"> <el-input v-model="searchForm.email" placeholder="邮箱" style="width: 120px;" /> </el-form-item>
      <el-form-item> <el-button type="primary" @click="handleSearchFormSubmit"> <d2-icon name="search" /> 查询 </el-button> </el-form-item>
      <el-form-item> <el-button @click="handleSearchFormReset"><d2-icon name="refresh" /> 重置 </el-button> </el-form-item>
    </el-form> -->
    <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;" @sort-change="handleSortChange">
      <el-table-column label="账号名称" prop="name">
        <template slot-scope="scope">
          {{scope.row.real_name}}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="trueName">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="phone" prop="phone">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column> -->
      <el-table-column label="状态" prop="isAdd">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.isAdd" size="mini" type="info">未添加</el-tag>
          <el-tag v-if="scope.row.isAdd" size="mini" type="success">已添加</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isAdd" type="primary" title="添加" size="mini" icon="el-icon-plus" circle @click="modifyRoleUser(scope.row.id,0)"></el-button>
          <el-button v-if="scope.row.isAdd" type="danger" title="移除" size="mini" icon="el-icon-minus" circle @click="modifyRoleUser(scope.row.id,1)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- <div slot="footer">
      <el-pagination :current-page="page.current" :page-size="page.size" :total="page.total" :page-sizes="[1,100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" style="margin: -10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div> -->
  </el-dialog>
</template>
<script>
// import * as userService from "@/api/sys/user";
export default {
  name: "roleUser",
  props: {
    role: Object,
    // role: {},
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        name: "",
        email: ""
      },
      loading: false,
      tableData: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: "",
        order: ""
      }
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    async dialogOpen() {
      this.getTableData();
    },
    getTableData() {
      console.log("从父组件传过来的role")
      console.log(this.role)
      console.log(this.role.id)
      this.$axios.get(`/api/list-role-of-users/${this.role.id}`)
        .then(res =>{
          console.log("要用户----用户---")
          console.log(this.role)
          console.log(res.list)
          this.tableData = res.list
        }).catch(() => {
          console.log("7777777777777777777777777")
        })
        // this.$axios.get(`api/list-role-of-users/28`)
        //   .then(res => {
        //     console.log("状态---状态----")
        //     console.log(res)
        //   })
    },
    handleSearchFormSubmit() {
      this.getTableData();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    handleSortChange(val) {
      this.sort.prop = val.prop;
      this.sort.order = val.order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    modifyRoleUser(user_id, action) {
      console.log("---操作---")
      console.log(user_id)
      if(action){
        this.$axios.delete(`/api/user_role`, {data:{'user_id':user_id, 'role_id':this.role.id}})
        .then((res) => {
            for(let i = 0; i < this.tableData.length; i++)
            {
              if(this.tableData[i].id == user_id) { this.tableData[i].isAdd = 0; }
            }
            this.$notify({
              title: "操作成功",
              message: "已移除",
              type: "success"
            }); 
        });
      }else{
        this.$axios.put(`/api/user_role`,{}, {data:{'user_id':user_id, 'role_id':this.role.id}})
        .then((res )=> {
            for(let i = 0; i < this.tableData.length; i++)
            {
              if(this.tableData[i].id == user_id) { this.tableData[i].isAdd = 1 }
            }
            this.$notify({
              title: "操作成功",
              message: "已添加",
              type: "success"
            });
        });
      }
    }
  }
};
</script>

