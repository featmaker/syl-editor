<template>
  <div class="drop-list font-names-list" v-show="stated.showDropList">
      <ul>
        <li>
          hello world
          </li>
      </ul>
  </div>
</template>

<script>
import Config from '../../config/index'

export default {
    data() {
      let fonts = Config.getConfig('fontName')
      return {

      }
    },
    computed: {
      stated: function() {
        return this.$store.state.menuBar['fontName']
      }
    }
}
</script>

<style>

</style>
