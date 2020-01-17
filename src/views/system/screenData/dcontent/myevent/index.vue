<template>
  <div class="myevent-box">
    <table class="table">
      <thead>
        <tr>
          <!-- <th class="col-md-2">{{ $t("data.event.id") }}</th> -->
          <th class="col-md-3">{{ $t("data.event.camera_name") }}</th>
          <th class="col-md-5">{{ $t("data.event.time") }}</th>
          <th class="col-md-4">{{ $t("data.event.message") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getData" :key="index">
          <!-- <td class="col-md-2">{{ item.id }}</td> -->
          <td class="col-md-3">{{ item.warning_camera_name }}</td>
          <td class="col-md-5">
            {{ item.warning_time.substring(0, 19) }}
          </td>
          <td class="col-md-4">{{ item.warning_message }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      getData: {}
    };
  },
  watch: {
    data(data) {
      if (data) {
        this.getData = data;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.myevent-box {
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: scroll;
  margin-top: 1px;  
  .table {
    table-layout: fixed;   
    tr {
      border: none;
      th {
        font-size: 1rem;
        text-align: center;
        background: #053a98;
        color: #fffdef;
        border: 1px solid#0086B3;
      }
      td {
        overflow-y:scroll;
        font-size: 1rem;
        text-align: center;
        border: 1px solid#0086B3;
        color: #19d4ae;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:nth-child(odd) {
        td {
          color: #5ab1ef;
        }
      }
    }
  }
// .table tbody {
//     display:block;
//     height:250px;
//     width:900px;
    
//     text-align: center;
// }

}
</style>
