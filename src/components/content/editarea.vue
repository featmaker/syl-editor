<template>
  <div class="syl-editor-editarea">
    <div class="edit-area" id="edit-body" contenteditable="true">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
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
        if(!val) {
          this.updateContent('<p><br><p>')
        } else {
          this.updateContent(val)
        }
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
        this.editBody = document.getElementById('edit-body')
        this.addListener()
        this.initEdit
      },
      addListener() {
        let that = this
        this.editBody.addEventListener('keydown', function(event){
          if(event.keyCode == '8') {
            if(that.checkBodyEmpty()) {
              event.preventDefault()
            }
          }
        })
        document.addEventListener('selectionchange', function() {
          clearTimeout(timer)
          let timer = setTimeout(function () {
            that.updateMenuState()
          },100)
        })
      },
      updateMenuState() {
          let data = {}
          for(let menu in this.menus) {
            if(['redo', 'undo'].indexOf(menu) == -1) {
              if(document.queryCommandSupported(menu)) {
                data[menu] = document.queryCommandState(menu) ? 'active' : 'default'
              } else {
                data[menu] = 'default'
              }
            }
          }
          this.$store.dispatch('updateMenuStatus', data)
      },
      checkBodyEmpty() {
        let children = this.editBody.children
        if(children.length <= 1 && !children[0].textContent.length ) {
          return true
        }
        return false
      },
      exec(name, value) {
        if (document.queryCommandSupported('styleWithCSS')) {
          document.execCommand('styleWithCSS', false, false)
        }
        if(this.editBody) {
          let range = this.getRange()
          console.log(range)
          if(range) {
            console.log(name)
            document.execCommand(name, false, value ? value : false)
          }
        }
      },
      getRange() {
        let range = document.getSelection()
        if(range && range.rangeCount !== 0) {
          return range.getRangeAt(0)
        }
      },
      setRange(range) {
        let newRange = document.getSelection()
        newRange.removeAllRanges()
        newRange.addRange(range)
      },
      removeRange() {
        let range = document.getSelection()
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
          let selection = document.getSelection()
          let range = this.getRange()
      },
      rangeChange() {

      },
    },
    mounted() {
      this.init()
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
