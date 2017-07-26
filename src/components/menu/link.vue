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
            range: '',
        }
    },
    watch: {
      'showDropList': function(val) {
        if(val) {
          this.range = this.getRange()
          let text = this.getRangeText(this.range)
          console.log(this.range)
          if(text) {
            this.text = text
          }
        } else {
          this.text = ''
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
        }
    },
    methods: {
        handleLink() {
          if(this.text) {
            this.$store.dispatch('execCommand', false, {
              name: 'createLink',
              value: this.link
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
            this.$store.dispatch('execCommand', false, {
              name: 'insertHTML',
              value: a
            })
          }
        },
        getRange() {
          let select = document.getSelection()
          if(select && select.rangeCount != 0) {
            return select.getRangeAt(0)
          }
        },
        getRangeText(range) {
            if(this.rangeValid(range)) {
              return range.toString()
            }
        },
        rangeValid(range) {
          let testRange = range || this.range
          if(testRange) {
            return testRange.collapsed
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
