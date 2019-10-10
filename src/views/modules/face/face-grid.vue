<template>
  <v-layout row>
    <v-flex xs15 sm7 offset-sm2>
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex v-for="(item, index) in faceimg" :key="index" xs3>
              <router-link :to="{name:'face-match',params: {id:item.userid_id}}">
                <img :src=item.imgurl  alt="lorem" width="100%" height="100%">
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props:{
    faceimg: Array,
    faceid: Number,
    required: true
  }
  
}
</script>
