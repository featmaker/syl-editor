<template>
  <div class="syl-editor-editarea" v-show="!sourceView">
    <div class="edit-area" id="syl-editor-body" contenteditable="true">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        editorBody: '',
        currentRange: null,
        isInit: false,
        rangeFocus: false
      }
    },
    computed: mapState({
      menus: 'menuBar',
      content: 'content',
      command: 'command',
      sourceView: 'sourceView'
    }),
    watch: {
      'content': function(val) {
        if (!val.trim()) {
          this.initEditBody()
          return
        }
        if(this.editorBody.innerHTML != val) {
          this.editorBody.innerHTML = val
          this.updateMenuState()
        }
      },
      'command': function(cmd) {
        this.exec(cmd.name, cmd.value)
      }
    },
    methods: {
      init() {
        this.editorBody = document.getElementById('syl-editor-body')
        this.addListener()
        this.initEditBody()
        this.editareaFocus()
        this.isInit = true
      },
      addListener() {
        let that = this
        this.editorBody.addEventListener('keydown', function(event){
          if(event.keyCode == '8') {
            if(that.checkBodyEmpty()) {
              event.preventDefault()
              that.initEditBody()
            }
          }
        })
        document.addEventListener('selectionchange', function() {
          if(that.sourceView) {
            return
          }
          clearTimeout(timer)
          let timer = setTimeout(function () {
            that.updateMenuState()
          },100)
          that.setRange()
        })
      },
      initEditBody() {
        if(this.checkBodyEmpty()) {
          if (!this.isInit) {
            this.editorBody.innerHTML = this.content
          } else {
            this.editorBody.innerHTML = '<p><br></p>'
          }
        }
      },
      editareaFocus() {
        let that = this
        this.editorBody.onfocus = function () {
          that.$store.dispatch('showDropList');
        }
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
        return this.editorBody.textContent == ''
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
            this.restoreRange()
            return
          }
          document.execCommand(name, false, value)
          this.restoreRange()
        }
      },
      setRange(range) {
       let selection = document.getSelection()
       if(range && selection) {
         selection.removeAllRanges()
         this.currentRange = range
         selection.addRange(range)
         return
       }
       if(selection.rangeCount == 0) {
         return
       }
       let _range = selection.getRangeAt(0),
        ancestor = _range.commonAncestorContainer,
        parNode = ancestor.nodeType === 1 ? ancestor : ancestor.parentNode
       if(!parNode) return
       if(this.editorBody.contains(ancestor)) {
         this.currentRange = _range
         this.rangeFocus = true
       } else {
         this.rangeFocus = false
       }
      },
      // isContain(parNode, child) {
      //     let parentNode = child.parentNode
      //     while(parentNode) {
      //       if(parNode === parentNode) {
      //         return true
      //       }
      //       parentNode = parentNode.parentNode
      //     }
      //     return false
      // },
      restoreRange() {
        if(!this.currentRange) return
        let selection = document.getSelection()
        if(selection) {
          selection.removeAllRanges()
          selection.addRange(this.currentRange)
        }
      },
      insertHTML(val){
        let selection = document.getSelection()
        if(!this.currentRange) return
        let frag = document.createDocumentFragment()
        let obj = document.createElement('div')
        let node = null
        obj.innerHTML = val
        if(obj.firstChild) {
          node = obj.firstChild
          frag.appendChild(node)
        }
        this.currentRange.insertNode(frag)
        this.currentRange.setStartAfter(node)
      },
      getRange() {
        let selection = document.getSelection()
        if (selection) {
          if(selection.rangeCount !== 0) {
            return selection.getRangeAt(0)
          }
        }
      },
      unlink() {
        let range = this.getRange()
        let ancestor = range.commonAncestorContainer
        if(ancestor.nodeType == 3) {
          ancestor = ancestor.parentNode
        }
        // return
        if(ancestor.tagName == 'A') {
          let selection = document.getSelection()
          let newRange = document.createRange()
          newRange.selectNode(ancestor)
          // return
          this.setRange(newRange)
          this.exec('UnLink', null)
          newRange.collapse(false)
          selection.removeRange(newRange)
          this.restoreRange()
        } else {
          this.exec('UnLink', null)
        }
      },
      viewSource() {
        let oldView = this.sourceView
        this.$store.dispatch('changeView', !this.sourceView)
        if(!oldView) {
          this.$store.dispatch('updateContent', this.editorBody.innerHTML)
          this.$store.dispatch('updateMenuStatus', {
            all: 'disable'
          })
          this.$store.dispatch('updateMenuStatus', {
            source: 'active'
          })
        } else {
          this.$store.dispatch('updateMenuStatus', {
            all: 'default'
          })
        }
      }
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
    border: 1px solid #666;
    text-align: left;
    padding: 10px 15px;
    overflow-y: auto;
    .edit-area {
      height: 95%;
      outline: none;
      &:active {
        outline: none;
      }
    }
  }
</style>
