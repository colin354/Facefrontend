<template>
  <el-dialog :visible.sync="dialogVisible" @open="dialogOpen">
    <div slot="title">维护
      <el-tag>{{role.name}}</el-tag>权限</div>
    <!-- <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom: 5px;"></el-input> -->
    <el-tree ref="tree" show-checkbox check-on-click-node default-expand-all :props="{label: 'title'}" highlight-current node-key="id" :data="permissionList" :filter-node-method="filterNode" :expand-on-click-node="false">
      <span slot-scope="{ node, data }">
        <i v-if="data.type==2" class="fa fa-cog"></i>&nbsp;{{ node.label }}
      </span>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="saveRolePermission">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>

</template>
<script>
// import * as roleService from "@/api/sys/role";
// import * as menuService from "@/api/sys/menu";
//import axios from 'axios'
export default {
  name: "rolePermission",
  props: {
    role: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      filterText: "",
      permissionList: []
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    async dialogOpen() {
      console.log("看看role--role")
      console.log(this.role)
      console.log(this.role.id)
      let res1 = await this.$axios.get(`/api/menus`);
      let res2 = await this.$axios.get(`/api/role-of-menu/${this.role.id}`);
      this.permissionList =res1.list
      console.log("---permissionList---")
      console.log(this.permissionList)
      console.log("---res2.list---")
      console.log(res2.list)
      this.$refs.tree.setCheckedKeys(res2.list);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    saveRolePermission() {
      //let checkedNodes = this.$refs.tree.getCheckedNodes(true, false);
      //let checkedPermissins = [];
      //for (let checked of checkedNodes) {
      //  checked.type == 2 && checkedPermissins.push(checked.id);
      //}
      //let data = {
        //roleId: this.role.id,
        //permissions: checkedPermissins
      //};
      //this.loading = true;
      // roleService.savePermission(data).then(data => {
      //   this.loading = false;
      //   this.dialogVisible = false;
      // });

      let checkedNodesId = this.$refs.tree.getCheckedKeys();
      console.log(checkedNodesId);
      let data = {role_id:this.role.id, menu_id:checkedNodesId};
      this.$axios.post(`/api/role-of-menu`,data).then((res)=>{ 
        this.$message({
            message: "提交成功",
            type: "success",
            duration: 500,
          });  
            this.close();
            //close();
      });
    },
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

