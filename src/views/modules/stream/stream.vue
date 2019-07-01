<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form :inline="true" size="mini" :model="dataForm">
              <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
              </el-form-item>
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
              <el-table-column prop="streamname" :label="$t('stream.name')" sortable="custom" header-align="center" align="center" width="150"/>
              <el-table-column prop="streamlocation" :label="$t('stream.location')" header-align="center" align="center"/>
              <el-table-column prop="streamurl" :label="$t('stream.url')" header-align="center" align="center"/>
              <el-table-column prop="createDate" :label="$t('oss.createDate')" sortable="custom" header-align="center" align="center"/>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                  <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
                  <el-button type="primary" size="mini" @click="selectHandle(scope.row.id)">{{ $t('query') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
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
    </el-row>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './stream-add-or-update'
import { cookieGet } from '@/common/cookie'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {}
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    position: right;
    top: 20px;
    right:  20px;
    bottom: 20px;
    left: 20px;
  }  
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
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