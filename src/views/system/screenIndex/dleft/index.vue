<template>
  <div class="right-content">
    <div class="top-box">
      <div class="messege">
        <topLeft :message="topMessage" :noMessage="topNoMessage"></topLeft>
      </div>
      <div class="messege">
        <middle-left></middle-left>
      </div>
      <div class="messege">
        <bottom-left></bottom-left>
      </div>            
    </div>
  </div>
</template>

<script>
import follower from './follower'
import message from './message'
import { cookieGet } from '@/common/cookie'
import topLeft from './top-left'
import middleLeft from './middle-left'
import bottomLeft from './bottom-left'

export default {
  components: {
    follower,
    message,
    topLeft,
    middleLeft,
    bottomLeft
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
