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
            <!-- <el-form-item>
              <el-select v-model="dataForm.status" :placeholder="$t('logLogin.status')" clearable>
                <el-option :label="$t('logLogin.status0')" :value="0"/>
                <el-option :label="$t('logLogin.status1')" :value="1"/>
                <el-option :label="$t('logLogin.status2')" :value="2"/>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item>
          </el-form>
          <el-table
            size="mini"
            v-loading="dataListLoading"
            :data="dataList"
            border
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column prop="id" label="序号" header-align="center" align="center"/>
            <el-table-column prop="card_room" label="楼栋号码" sortable header-align="center" align="center"/>
            <el-table-column prop="card_name" label="姓名" header-align="center" align="center"/>
            <el-table-column prop="card_unit" label="单位信息" header-align="center" align="center"/>
            <el-table-column prop="card_phone_num" label="手机号码" header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="inoutRecord(scope.row.id)">出入记录</el-button>
              </template>
            </el-table-column>
          </el-table>

      <el-dialog title="出入记录" :visible.sync="dialogTableVisible">
        <el-table :data="inout_dataList">
          <el-table-column property="inout_date" label="日期" width="150"></el-table-column>
          <el-table-column property="inout_unit" label="场所" width="200"></el-table-column>
          <el-table-column property="inout_status" label="进/出"></el-table-column>
        </el-table>
      </el-dialog>

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
                <span>今日统计</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
              </div>
              <el-row>
                <h2><span>入住人数：18</span></h2>
                <br/>
                <span>解禁人数：20</span>
              </el-row>
            </el-card>
          </div>
        </el-row>
      </el-col>
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
import dnumber from "./components/dnumber";
export default {
  mixins: [ mixinViewModule ],
  components: {
    dnumber
  },
  data () {
    return {
      dialogTableVisible: false,
      mixinViewModuleOptions: {
        getDataListURL: `/api/passcard?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/api/passcard/export?token=${cookieGet('token')}`
      },
      dataForm: {
        creatorName: '',
        status: ''
      },
      inout_dataList: ''
    }
  },
  methods: {
    inoutRecord (id) {
      this.dialogTableVisible = true
      this.$axios.get(`/api/passcard/page?token=${cookieGet('token')}`, { params: { card_id: 'id' } })
        .then(res => {        
          this.inout_dataList = ''
        })
        .catch(() => {
          console.log('error')
        })
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
      background: rgba(255, 255, 255, 0);
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
