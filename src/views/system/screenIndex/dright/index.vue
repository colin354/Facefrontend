<template>
  <div class="right-content">
    <div class="top-box">
      <div class="messege">
        <topRight></topRight>
      </div>
      <div class="messege">
        <middle-right></middle-right>
      </div>
      <div class="messege">
        <bottom-right></bottom-right>
      </div>            
    </div>
  </div>
</template>

<script>
import follower from './follower'
import message from './message'
import { cookieGet } from '@/common/cookie'
import topRight from './top-right'
import middleRight from './middle-right'
import bottomRight from './bottom-right'

export default {
  components: {
    follower,
    message,
    topRight,
    middleRight,
    bottomRight
  },
  props: {
    username: String
  },
  data() {
    return {
      followers: [],
      noFollowers: false,
      following: [],
      noFollowing: false,
      messege: [],
      noMessege: false,
      topMessage:[],
      topNoMessage:false,
      middleMessage:[],
      middleNoMessage:false,
      bottomMessage:[],
      bottomNoMessage:false,
    };
  },
  created() {
    // this.getData(this.username)
  },
  methods: {
    getData (username) {
      this.$axios.get(`/api/screenRight/warning?token=${cookieGet('token')}`)
        .then(response => {
          console.log('--------')
          console.log(response)
          this.messege = "lala"
          let data3 = JSON.parse(JSON.stringify(response))
          if (data3.length < 1) {
            this.noMessege = false
          } else {
            this.messege = "data3.list"
            this.followers = data3.target
            this.following = data3.strange
          }
          return
        })
        .catch(err => {
          console.log('eeerrr000---0000')
          console.log(err.message);
        });
    }
  },
  watch: {
    username (username) {
      this.getData(username)
    }
  }
};
</script>

<style scoped lang="scss">
.right-content {
  width: 100%;
  height: 100%;
  .top-box {
    padding-bottom: 40px;
    .messege {
      padding-top: 20px;
    }
  }
}
</style>
