<template>
  <div class="view-source-code" v-show="sourceView">
     <textarea class="source-code" v-model="content">
     </textarea>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        source: document.getElementsByClassName('source-code')[0],
        content: ''
      }
    },
    computed: mapState({
      sourceView: 'sourceView',
      content1: 'content'
    }),
    watch: {
      'sourceView': function(val) {
        let that = this
        if(!val) {
          console.log()
          this.$store.dispatch('updateContent', that.content ? this.content : '<p><br></p>')
        } else {
          this.content = this.content1
        }
      }
    },
    methods: {

    }

}
</script>

<style>
.view-source-code {
  display: flex;
  border: 1px solid #666;
}
.source-code {
  width: 100%;
  min-height: 458px;
  padding: 10px;
  border: none;
  outline: none;
  background: rgb(29, 29, 29);
  box-sizing: border-box;
  color: rgb(204, 204, 204);
  font-size: 15px;
}
</style>
