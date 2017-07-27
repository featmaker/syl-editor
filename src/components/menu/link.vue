<template>
    <div class="drop-list-item link-insert" v-show="showDropList" :style="style">
        <div class="add-link link-wrapper">
          <div class="form-group">
             <input type="text" name="" v-model="text" placeholder="请输入链接文字">
            <input type="text" name="" v-model="link" placeholder="请输入链接地址">
            <button type="button" @click="handleLink">确定</button>
          </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            text: '',
            link: '',
            range: ''
        }
    },
    watch: {
      'showDropList': function(val) {
        if(val) {
          this.range = this.getRange()
          let text = this.getRangeText()
          console.log(text)
          if(text) {
            this.text = text
          }
        }
      }
    },
    computed: {
        showDropList: function() {
            return this.$store.state.menuBar.link.showDropList
        },
        style: function() {
            let position = this.$store.state.position
            return {
                top: position.bottom + 'px',
                left: position.left + 'px'
            }
        },
        editorBody: function() {
          return document.getElementById('syl-editor-body')
        }
    },
    methods: {
        handleLink() {
          let that = this
          if(this.getRangeText()) {
            this.$store.dispatch('execCommand', {
              name: 'createLink',
              value: that.link
            })
          } else {
            this.createLink()
          }
          this.text = ''
          this.link = ''
          this.$store.dispatch('showDropList')
        },
        createLink() {
          if(this.text && this.link) {
            let a = `<a href="${this.link}" >${this.text}</a>`
            this.$store.dispatch('execCommand', {
              name: 'insertHTML',
              value: a
            })
          }
        },
        getRange() {
          let selection = document.getSelection()
          if(selection && selection.rangeCount != 0) {
            return selection.getRangeAt(0)
          }
        },
        getRangeText() {
            if(this.rangeValid(this.range)) {
              return this.range.toString()
            }
        },
        rangeValid(range) {
          let testRange = range || this.range
          if(testRange) {
            return !testRange.collapsed
          }
        }
    }
}
</script>

<style lang="scss" scoped>
  .link-wrapper{
    .form-group {
      padding: 10px;
      text-align: right;
      input {
        display: block;
        margin-bottom: 5px;
      }
      button {
        cursor: pointer;
      }
    }
  }
</style>
