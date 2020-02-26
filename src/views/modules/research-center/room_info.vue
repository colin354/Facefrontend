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
            border
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column prop="id" label="序号" header-align="center" align="center"/>
            <el-table-column prop="room_num" label="房间号" sortable header-align="center" align="center"/>
            <el-table-column prop="room_floor" label="所属单元" header-align="center" align="center"/>
            <el-table-column prop="room_people" label="入住情况" sortable header-align="center" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.room_people === 0" size="mini" type="success">空闲</el-tag>
                <el-tag v-else size="mini" type="primary">{{scope.row.room_people}}人</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="room_company" label="单位信息" header-align="center" align="center"/>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="inoutRecord(scope.row.id)">住户信息</el-button>
              </template>
            </el-table-column>
          </el-table>

      <el-dialog title="住户信息" :visible.sync="dialogTableVisible">
        <el-table
          size="mini"
          v-loading="dataListLoading"
          :data="inout_dataList"
          border
          @sort-change="dataListSortChangeHandle"
          style="width: 100%;">
          <!-- <el-table-column prop="people_room_num" label="房间号" header-align="center" align="center"/> -->
          <el-table-column label="房间信息" header-align="center" align="center">
            <template slot-scope="scope">
              {{scope.row.people_room_floor}}#{{scope.row.people_room_num}}
            </template>
          </el-table-column>
          <el-table-column prop="people_name" label="姓名" header-align="center" align="center"/>
          <el-table-column prop="people_sex" label="性别" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.people_sex === 0" size="mini" type="danger">女</el-tag>
              <el-tag v-else-if="scope.row.people_sex === 1" size="mini" type="success">男</el-tag>
              <el-tag v-else size="mini" type="info">未录入</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="dataForm.roomFloor === '10'" prop="people_wtemp" label="体温" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.people_wtemp === 0" size="mini" type="success">正常</el-tag>
            </template>          
          </el-table-column>
          <!-- <el-table-column prop="people_come_from" label="来源地" header-align="center" align="center"/> -->
          <el-table-column prop="people_unit" label="单位" header-align="center" align="center"/>
          <el-table-column prop="people_check_in" label="进住时间" sortable header-align="center" align="center"/>
          <el-table-column prop="people_check_out" label="解禁时间" sortable header-align="center" align="center"/>
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
                <h4><span>总户数：{{total}} 户</span></h4>
                <h4><span>总房间数：{{suite_num}}间</span></h4>
                <h4><span>入住人数：{{people_num}}人</span></h4>
              </el-row>
            </el-card>
          </div>
        </el-row>
        <el-row>
          <g2-pie type="pie" :axis-name="{ name: '房屋状态', value: '值' }"
          :data="photo_data"  :label-option="{ show: true, offset: -20 }"
          >
          </g2-pie>
        </el-row> 
        <!-- <el-row>
          <div id="room_info" ></div>
        </el-row>         -->
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
  mounted () { 
    console.log('mountttttt')
    // var id = this.$route.params.roomFloor
    // console.log(id)
      // this.$axios.get(`/api/quarroom?token=${cookieGet('token')}`, { params: { roomFloor: id } })
      //   .then(res => {        
      //     // console.log(res.list)
      //     // this.inout_dataList = res.list
      //   })
      //   .catch(() => {
      //     console.log('error')
      //   })
  },
  updated (){
    console.log('aaaaaftermount')
    // this.drawchart()
  },
  data () {
    let roomFloor = this.$route.params.roomFloor;
    return {
      dialogTableVisible: false,
      mixinViewModuleOptions: {
        getDataListURL: `/api/quarroom?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/api/quarroom/export?token=${cookieGet('token')}`
      },
      dataForm: {
        creatorName: '',
        status: '',
        roomFloor: roomFloor,
      },
      data_pie: [
        { name: '空闲', value: 40 }, 
        { name: '2人居住', value: 21 }, 
        { name: '4人居住', value: 17 }
      ],
      inout_dataList: []
    }
  },
  methods: {
    inoutRecord (id) {
      this.dialogTableVisible = true
      this.$axios.get(`/api/quarpeople?token=${cookieGet('token')}`, { params: { room_id: id } })
        .then(res => {        
          console.log(res.list)
          this.inout_dataList = res.list
        })
        .catch(() => {
          console.log('error')
        })
    },

    drawchart () {

      // var data1 = this.photo_data
      // const data = []
      // var str_data =""
      // for(var i=0;i<data1.length;i++)
      // {
      //   if(data1[i][0] === 0){
      //     str_data = "空闲"
      //   }else{
      //     str_data = (data1[i][0]).toString()+"人居住"
      //   }

      //   var d = {item: str_data, count: data1[i][1],percent:parseFloat((data1[i][1]/this.total).toFixed(2))}
      //   data.push(d)
      // };
      // console.log(data)
      const data = [
        { item: '空闲', count: 40, percent: 0.4 },
        { item: '2人居住', count: 21, percent: 0.21 },
        { item: '4人居住', count: 17, percent: 0.17 }
      ];
      const chart = new G2.Chart({
        container: 'room_info',
        forceFit: true,
        height: 300
      });
      chart.source(data, {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
      });
      chart.coord('theta');
      chart.tooltip({
        showTitle: false
      });
      chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          // autoRotate: false,
          textStyle: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff'
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
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
