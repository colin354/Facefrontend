<template>
  <div class="right-content">
    <div class="top-box">
      <databox :title="''" :dheight="440">
        <databox
          :title="$t('data.dright.warning_target')"
          :dheight="210"
          :boxb="false"
        >
          <follower :data="followers"></follower>
          <nodata
            :nodata="$t('data.dright.index.noFollowers')"
            v-if="noFollowers"
          ></nodata>
        </databox>
        <databox
          :title="$t('data.dright.warning_info')"
          :dheight="210"
          :boxb="false"
        >
          <follower :data="following"></follower>
          <nodata
            :nodata="$t('data.dright.index.noFollowing')"
            v-if="noFollowing"
          ></nodata>
        </databox>        
      </databox>
      <div class="messege">
        <databox
          :title="$t('data.dright_messege')"
          :dheight="260"
          :icon="'account'"
        >
          <message :data="messege"></message>
          <nodata
            :nodata="$t('data.dright.index.messege')"
            v-if="noMessege"
          ></nodata>
        </databox>
      </div>
    </div>
  </div>
</template>

<script>
import follower from './follower'
import message from './message'
import { cookieGet } from '@/common/cookie'
export default {
  components: {
    follower,
    message
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
      noMessege: false
    };
  },
  created () {
    // this.getData(this.username)
  },
  methods: {
    getData (username) {
      this.$axios.get(`/api/screenRight/warning?token=${cookieGet('token')}`)
        .then(response => {
          console.log('--------')
          console.log(response)
          let data3 = JSON.parse(JSON.stringify(response))
          if (data3.length < 1) {
            this.noMessege = true
          } else {
            this.messege = data3.list
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
