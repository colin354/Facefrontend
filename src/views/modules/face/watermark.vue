<template>
  <d2-container>
    <el-row :gutter="18">
      <div class="wrap">
        <el-col :span="10">
          <div class="optea">
            <div class="file-upload">
              <p>选择图片</p>
              <el-button type="text" style="color: #c00;"><label for="uploads">
                  <i class="el-icon-upload2" style="margin-right: 5px;"></i>选择需要添加水印的图片</label>
              </el-button>
              <input
                type="file"
                id="uploads"
                hidden accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="uploadImg($event, 1)"/>
            </div>
              <p>水印文字</p>
              <el-input v-model="watermarkOptions.text" placeholder="请输入水印内容"></el-input>
              <p>字体颜色</p>
              <el-color-picker v-model="watermarkOptions.color"></el-color-picker>
              <p>旋转角度</p>
              <el-slider v-model="watermarkOptions.rotate" :min="0" :max="360"></el-slider>
              <p>透明度</p>
              <el-slider v-model="watermarkOptions.alpha" :min="0" :max="100"></el-slider>
              <p>文本间距</p>
              <el-slider v-model="watermarkOptions.width" :min="0" :max="100"></el-slider>
              <p>字体大小</p>
              <el-slider v-model="watermarkOptions.fontSize" :min="0" :step="0.5" :max="50"></el-slider>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-button @click="handleDown" class="download-btn" type="primary" plain icon="el-icon-download">下载水印图片</el-button>
            <div class="preview" ref="previewImg">
              <img :src="preImg || defaultimg" alt="" />
              <div class="watermark" :style="{ background: paint }"></div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/> -->
    <!-- 分页 -->
    <!-- <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination> -->
  </d2-container>
</template>

<script>
// import mixinViewModule from '@/mixins/view-module'
// import AddOrUpdate from './model-add-or-update'
import { cookieGet } from '@/common/cookie'
import DomToImage from '../../../../node_modules/dom-to-image'
import qs from 'qs'
export default {
  // mixins: [ mixinViewModule ],
  name: "watermark",
  data () {
    return {
      // mixinViewModuleOptions: {
      //   getDataListURL: '/act/model/page',
      //   getDataListIsPage: true,
      //   deleteURL: '/act/model',
      //   deleteIsBatch: true
      // },
      defaultimg:'',
      preImg: '',
      watermarkOptions: {
        text: '中科睿芯',
        fontSize: 10,
        width: 5,
        color: '#000000',
        alpha: 35,
        rotate: 35,
      },
    }
  },
  components: {
    // AddOrUpdate
    DomToImage
  },
  methods: {
    uploadImg(e, num) {
      console.log("上传图片")
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      console.log(file)
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        console.log("reader中的内容")
        console.log(e)
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.preImg = data;
        }
      };
      // 转化为base64
      // console.log("转化为base64")
      // console.log(file)
      // console.log(reader.readAsDataURL(e.target.files[0]))
      if(e.target.files[0]){reader.readAsDataURL(file);}
      // 转化为blob
      // reader.readAsArrayBuffer(e.target.files[0])
    },
    //下载水印图片
    handleDown() {
      let node = this.$refs.previewImg;
      console.log("node----")
      console.log(node)
      let that = this;
      console.log(DomToImage)
      console.log(node)
      DomToImage.toPng(node)
        .then(function(dataUrl) {
          console.log("----lala")
          console.log(dataUrl)
          var oLink = document.createElement('a');
          oLink.download = '水印图片.png';
          oLink.href = dataUrl;
          oLink.click();
          that.$nextTick(() => {
            that.$message.success('水印图片下载成功');
          });
        })
        .catch(function(error) {
          console.error('oops, something went wrong!', error);
          that.$message.error('下载失败');
        });
    },
  },
  computed: {
    paint() {
      // 文字长度
      const wordWidth =
        this.watermarkOptions.fontSize * this.watermarkOptions.text.split('').length;
      const width = wordWidth + this.watermarkOptions.width;

      let svgText = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${width}px">
    <text x="50%" y="50%"
        alignment-baseline="middle"
        text-anchor="middle"
        stroke="${this.watermarkOptions.color}"
        opacity="${this.watermarkOptions.alpha / 100}"
        transform="translate(${width / 2}, ${width / 2}) rotate(${
        this.watermarkOptions.rotate
      }) translate(-${width / 2}, -${width / 2})"
        font-weight="100"
        font-size="${this.watermarkOptions.fontSize}"
        font-family="microsoft yahe"
        >
        ${this.watermarkOptions.text}
    </text>
   </svg>`;

      return `url(data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgText)))})`;
    },
  },
  // methods: {
  //   // 获取在线设计url地址
  //   getModelerURL (id) {
  //     var params = qs.stringify({
  //       'token': cookieGet('token'),
  //       'modelId': id
  //     })
  //     return `${window.SITE_CONFIG['apiURL']}/modeler.html?${params}`
  //   },
  //   // 获取导出url地址
  //   getExportURL (id) {
  //     var params = qs.stringify({
  //       'token': cookieGet('token')
  //     })
  //     return `${window.SITE_CONFIG['apiURL']}/act/model/export/${id}?${params}`
  //   },
  //   // 部署
  //   deployHandle (id) {
  //     this.$confirm(this.$t('prompt.info', { 'handle': this.$t('model.deploy') }), this.$t('prompt.title'), {
  //       confirmButtonText: this.$t('confirm'),
  //       cancelButtonText: this.$t('cancel'),
  //       type: 'warning'
  //     }).then(() => {
  //       this.$axios.post(`/act/model/deploy/${id}`).then(res => {
  //         this.$message({
  //           message: this.$t('prompt.success'),
  //           type: 'success',
  //           duration: 500,
  //           onClose: () => {
  //             this.getDataList()
  //           }
  //         })
  //       }).catch(() => {})
  //     }).catch(() => {})
  //   }
  // }
}
</script>
