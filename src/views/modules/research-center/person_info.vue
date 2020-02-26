<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="18">    
      <div class="grid-content bg-purple">
        <el-card class="box-card">  
          <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-input v-model="dataForm.queryName" placeholder="姓名" clearable/>
            </el-form-item>
            <el-form-item>
              <el-select v-model="dataForm.status" placeholder="人员状态" clearable>
                <el-option label="入住" :value="1"/>
                <el-option label="离开" :value="0"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="queryHandle()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item> -->
          </el-form>
          <el-table
            size="mini"
            v-loading="dataListLoading"
            :data="dataList"
            border
            @selection-change="dataListSelectionChangeHandle"
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column type="selection" header-align="center" align="center" width="50"/>
            <el-table-column prop="id" label="序号" header-align="center" align="center" width="80"/>
            <el-table-column label="房间信息" header-align="center" align="center">
              <template slot-scope="scope">
                {{scope.row.people_room_floor}}#{{scope.row.people_room_num}}
              </template>
            </el-table-column>
            <el-table-column prop="people_name" label="姓名" header-align="center" align="center"/>
            <el-table-column prop="people_sex" label="性别" sortable header-align="center" align="center" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.people_sex === 0" size="mini" type="danger">女</el-tag>
                <el-tag v-else-if="scope.row.people_sex === 1" size="mini" type="success">男</el-tag>
                <el-tag v-else size="mini" type="info">未录入</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="people_unit" label="单位" header-align="center" align="center"/>
            <el-table-column prop="people_check_in" label="进住时间" sortable header-align="center" align="center"/>
            <el-table-column prop="people_check_out" label="解禁时间" sortable header-align="center" align="center"/>
            <el-table-column prop="people_status" label="入住状态" sortable header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.people_status === 0" size="mini" type="warning">{{scope.row.people_leave_time}}日离开</el-tag>
                <el-tag v-else-if="scope.row.people_status === 1" size="mini" type="primary">入住中</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="people_leave_time" label="离开时间" sortable header-align="center" align="center"/> -->
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                <el-button type="text" size="mini" :disabled="scope.row.people_status == 0 ? true : false" @click="leaveHandle(scope.row.id)">离开</el-button>
                <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      </el-col>
      <el-col :span="6">
        <!-- <el-row>
          <div class="content-cont">
            <databox
              title="今日统计"
              :dheight="150"
              :icon="'account'"
            >
            <div class="top-box">
              <div class="left">
                <dnumber
                  :dheight="10"
                  title="抓拍总数"
                  :size="'2rem'"
                  :dnumber="10"
                  :color="'#25f3e6'"
                >
                </dnumber>                
              </div>
              <div class="right">
                <div class="content">
                  <dnumber
                    :dheight="10"
                    title="抓拍总数"
                    :size="'2rem'"
                    :dnumber="20"
                    :icon="'jindu1'"
                    :color="'#25f3e6'"
                  >
                  </dnumber>
                  <dnumber
                    :dheight="10"
                    title="抓拍总数"
                    :size="'2rem'"
                    :dnumber="20"
                    :icon="'success'"
                    :color="'#25f3e6'"
                  >
                  </dnumber>       
                </div>
              </div>
            </div>
            </databox> 
          </div>
        </el-row> -->
        <el-row>
          <!-- <div id="c2"></div> -->
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>入住统计</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
              </div>
              <el-row>
                <g2-line :is-smooth="true" :padding="['auto', 100]" :height="250"
                :data="photo_data"
                :axis-name="{name:'年份', value:'GDP(亿美元)', type:'国家'}">
                </g2-line>  
              </el-row>
            </el-card>
          </div>
        </el-row>
      </el-col>
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </el-row>
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
import { cookieGet } from '@/common/cookie'
import dnumber from "./components/dnumber"
import AddOrUpdate from './person-add-or-update'
export default {
  mixins: [ mixinViewModule ],
  components: {
    dnumber,
    AddOrUpdate
  },
  mounted () { 
    // this.drawchart()
  },
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/quarpeople?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/quarpeople?token=${cookieGet('token')}`,
        deleteIsBatch: true,
        exportURL: `/api/quarpeople/export?token=${cookieGet('token')}`
      },
      dataForm: {
        id: '',
        queryName: '',
        status: ''
      }
    }
  },
  methods: { 
    queryHandle () {
      this.page = 1
      this.getDataList()
    },
    leaveHandle (id){
      this.$axios
        .put(`/api/quarpeople?token=${cookieGet("token")}`,{id:id,leave:'1'})
        .then(res => {
          this.getDataList()
        })
        .catch(() => {});      
    }
  }
}
</script>

<style scoped lang="scss">
.content-cont {
  width: 100%;
  height: 100%;
  .top-box {
    display: flex;
    width: 100%;
    height: 110px;
    overflow: hidden;
    .left {
      width: 1/3 * 100%;
      background: rgba(248, 245, 245, 0);
    }
    .right {
      flex: 1;
      padding-left: 15px;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0);

        .number-box {
          width: 50%;
          float: left;
        }
      }
    }
  }
  .content-box {
    padding-top: 30px;
  }
}
</style>
