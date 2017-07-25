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
          this.getRange()
          if(this.range) {
            let str = this.range.commonAncestorContainer.data
            console.log(str)
            this.text = (str && str.trim())
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

        },
        getRange() {
          let select = document.getSelection()
          let range = ''
          if(select && select.rangeCount != 0) {
            range = select.getRangeAt(0)
          }
          this.range = range
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
