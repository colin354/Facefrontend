<template>
  <d2-container>
    <liveview></liveview>
  </d2-container>
</template>

<script>
import liveview from '../stream/liveview'
export default {
  name: 'video_plaze',
  components: {
    liveview
  },
  data () {
    return {
    }
  },  
}
</script>
