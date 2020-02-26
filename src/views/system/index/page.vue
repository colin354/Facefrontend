<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="18">    
      <div class="grid-content bg-purple">
        <el-card class="box-card">  
          <!-- <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-input v-model="dataForm.queryName" placeholder="姓名" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item>
          </el-form> -->
          <el-table
            size="mini"
            v-loading="dataListLoading"
            :data="dataList"
            :row-class-name="tableRowClassName"
            border
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column prop="id" label="序号" header-align="center" align="center"/>
            <el-table-column prop="floor_name" label="楼栋号" sortable header-align="center" align="center"/>
            <el-table-column prop="room_num" label="房间数" header-align="center" align="center"/>
            <el-table-column prop="camera_status" label="监控级别" sortable header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.camera_status === 0" size="mini" type="success">一般</el-tag>
                <el-tag v-else size="mini" type="danger">重点</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="room_list(scope.row.room_floor)">详细信息</el-button>
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
                <span>信息概览</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
              </div>
              <el-row>
                <h4><span>总楼栋数 ：{{total}}栋</span></h4>
                <h4><span>总户数 ：{{room_num}}户</span></h4>
                <h4><span>总房间数 ：{{suite_num}}间</span></h4>
                <h4><span>总人数 ：{{people_num}}人</span></h4>
                <h4>
                  <span>重点楼栋 ：<el-tag type="danger">9号楼</el-tag>&nbsp;&nbsp;<el-tag type="danger">10号楼</el-tag> 
                  </span>
                </h4>
                <br/>
                <!-- <span>已布控摄像头：220个</span> -->
              </el-row>
            </el-card>
          </div>
        </el-row>
        <el-row>
          <div id="c1"></div>
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
import dnumber from "./components/dnumber"
export default {
  mixins: [ mixinViewModule ],
  components: {
    dnumber
  },
  mounted () { 
    this.drawchart()
  },
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/quarfloor?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/api/quarfloor/export?token=${cookieGet('token')}`
      },
      dataForm: {
        queryName: '',
        status: ''
      }
    }
  },
  methods: {
    room_list (id) {
      this.$router.push({name: 'room_info',params:{ roomFloor: id}})
    },
    tableRowClassName ({row, rowIndex}) {  
      if (row.room_floor === '9') {
        return 'stranger-row'
      }
      if (row.room_floor === '10') {
        return 'stranger-row'
      }
      return ''
    },
    drawchart () {
      const data = [
        { genre: '1#楼', sold: 68 },
        { genre: '6#楼', sold: 90 },
        { genre: '10#楼', sold: 54 },
        { genre: '11#楼', sold: 96 },
        { genre: '16#楼', sold: 432 },
      ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: 'c1', // 指定图表容器 ID
        forceFit: true, // 图表跟随图表容器宽度变化
        height: 250, // 指定图表高度
      });
      console.log('-----chaaart-----')
      console.log(chart)

      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position('genre*sold')
        .color('genre');
      // Step 4: 渲染图表
      chart.render();
    }    
  }
}
</script>

<style scoped lang="scss">
.el-table .target-row {
  background: oldlace;
}

.el-table .stranger-row {
  background: #f10b0b3d;
}

.el-table .new-row {
  background: #110df13d;
}

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
