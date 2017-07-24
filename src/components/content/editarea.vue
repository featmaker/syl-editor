<template>
  <div class="syl-editor-editarea">
    <div class="edit-area" id="edit-body" contenteditable="true">
      {{ content }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        winDoc: '',
        editBody: ''
      }
    },
    computed: mapState({
      menus: 'menuBar',
      content: 'content',
      command: 'command',
      calee: 'calee'
    }),
    watch: {
      'content': function(val) {
        this.updateContent(val)
      },
      'command': function(cmd) {
        this.exec(cmd.name, cmd.value)
      },
      'calee': function(data) {
        this.callMethod(data.name, data.pararms)
      }
    },
    methods: {
      init() {
        this.winDoc = window.document
        this.editBody = winDoc.getElementById('edit-body')
      },
      exec(name, value) {
        if (this.winDoc.queryCommandSupported('styleWithCSS')) {
          this.windDoc.execCommand('styleWithCSS', false, false)
        }
        if(this.editBody) {
          this.winDoc.execCommand(name, false, value)
        }
      },
      getRange() {
        let range = this.winDoc.getSelection()
        if(range && range.rangeCount !== 0) {
          return range.getRangeAt(0)
        }
      },
      setRange(range) {
        let newRange = this.winDoc.getSelection()
        newRange.removeAllRanges()
        newRange.addRange(range)
      },
      removeRange() {
        let range = this.winDoc.getSelection()
        range.removeAllRanges()
      },
      rangeValid() {
        let range = this.getRange()
        if (range && !range.collapsed) {
          return true
        }
        return false
      },
      insertHTML(val){
          let selection = this.winDoc.getSelection()
          let range = this.getRange()

      },
      updateMenuState() {

      },
      rangeChange() {

      },

    }
}
</script>

<style lang="scss" scoped>
  .syl-editor-editarea {
    height: 458px;
    min-height: 458px;
    border-top: 1px solid #eee;
    text-align: left;
    padding: 10px 15px;
    .edit-area {
      height: 100%;
      outline: none;
      &:active {
        outline: none;
      }
    }
  }
</style>
