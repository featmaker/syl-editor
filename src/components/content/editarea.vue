<template>
  <div class="syl-editor-editarea">
    <div class="edit-area" id="syl-editor-body" contenteditable="true">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        editorBody: '',
        editorMenuBar: '',
        currentRange: null,
        rangeFocus: false
      }
    },
    computed: mapState({
      menus: 'menuBar',
      content: 'content',
      command: 'command'
    }),
    watch: {
      'content': function(val) {
        if(this.editorBody.innerHTML == val) {
          this.editorBody.innerHTML = val
          this.updateMenuState()
        }
      },
      'command': function(cmd) {
        this.exec(cmd.name, cmd.value)
      },
      // 'rangeFocus': function(val) {
      //   if(!val) {
      //     this.$store.dispatch('showDropList')
      //   }
      // }
    },
    methods: {
      init() {
        this.editorBody = document.getElementById('syl-editor-body')
        this.editorMenuBar = document.getElementById('syl-editor-menubar')
        this.editorBody.focus()
        this.addListener()
      },
      addListener() {
        let that = this
        this.editorBody.addEventListener('keydown', function(event){
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
          that.setRange()
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
        let children = this.editorBody.children
        if(children.length <= 1 && !children[0].textContent.length ) {
          return true
        }
        return false
      },
      exec(name, value) {
        if (document.queryCommandSupported('styleWithCSS')) {
          document.execCommand('styleWithCSS', false, false)
        }
        if(!this.rangeFocus) {
          this.restoreRange()
        }
        if(this.currentRange) {
          if(this[name]) {
            this[name](value)
            return
          }
          console.log(name)
          console.log(value)
          document.execCommand(name, false, value)
        }
      },
      setRange(range) {
       if(range) {
         this.currentRange = range
         return
       }
       let selection = document.getSelection()
       if(selection.rangeCount == 0) {
         return
       }
       let _range = selection.getRangeAt(0)
       let ancestor = _range.commonAncestorContainer
       let parNode = ancestor.nodeType === 1 ? ancestor : ancestor.parentNode
       if(!parNode) return
       if(this.isContain(this.editorBody, ancestor)) {
         this.currentRange = _range
         this.rangeFocus = true
       } else {
         this.rangeFocus = false
       }
      },
      isContain(parNode, child) {
          let parentNode = child.parentNode
          while(parentNode) {
            if(parNode === parentNode) {
              return true
            }
            parentNode = parentNode.parentNode
          }
          return false
      },
      restoreRange() {
        if(!this.currentRange) return
        let selection = document.getSelection()
        if(selection) {
          selection.removeAllRanges()
          selection.addRange(this.currentRange)
        }
      },
      insertHTML(val){
            console.log(val)
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
