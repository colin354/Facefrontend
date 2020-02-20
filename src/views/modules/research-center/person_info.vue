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
              <el-select v-model="dataForm.status" placeholder="性别" clearable>
                <el-option label="女" :value="0"/>
                <el-option label="男" :value="1"/>
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
            <el-table-column prop="crew_room" label="房间号" sortable header-align="center" align="center"/>
            <el-table-column prop="crew_name" label="姓名" header-align="center" align="center"/>
            <el-table-column prop="crew_come_from" label="来源地" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="crew_sex" label="性别" sortable="custom" header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.crew_sex === 0" size="mini" type="danger">女</el-tag>
                <el-tag v-else-if="scope.row.crew_sex === 1" size="mini" type="success">男</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="crew_check_in" label="进住时间" sortable header-align="center" align="center"/>
            <el-table-column prop="crew_check_out" label="解禁时间" sortable header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
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
        getDataListURL: `/api/plotcrew?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/api/plotcrew/export?token=${cookieGet('token')}`
      },
      dataForm: {
        queryName: '',
        status: ''
      }
    }
  },
  methods: {
    drawchart () {
      const data = [
        { genre: '安徽芜湖', sold: 275 },
        { genre: '江苏盐都', sold: 115 },
        { genre: '亭湖', sold: 120 },
        { genre: '北京', sold: 350 },
        { genre: '其他', sold: 150 },
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
