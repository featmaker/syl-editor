<template>
    <div class="drop-list-item table-insert" v-show="stated.showDropList" :style="style">
        <div class="table-size">
          <input type="number" name="" v-model="row" min="1">行 X
          <input type="number" name="" v-model="col" min="1"> 列
          <button type="button" @click="handleTable">确定</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            col: 1,
            row: 1
        }
    },
    watch: {
    //   'show': function(val) {
    //       console('name'+ val)
    //     if(!val) {
    //       this.$store.dispatch('getNodePosition', {})
    //     }
    //   }
    },
    computed: {
        stated: function() {
            return this.$store.state.menuBar.table
        },
        // show: function() {
        //     return this.stated.showDropList
        // },
        style: function() {
            let position = this.$store.state.position
            return {
                top: position.bottom + 'px',
                left: position.left + 'px'
            }
        }
    },
    methods: {
      handleTable() {
        if(this.row > 0 && this.col > 0) {
          let table = `<table>`
            for(let i = 0; i < this.row; i++) {
              table += `<tr>`
              for(let j = 0; j < this.col; j++) {
                table += '<td></td>'
              }
              table += '</tr>'
            }
            table += '</table>'
            this.$store.dispatch('execCommand', {
              name: 'insertHTML',
              value: table
            })
            this.$store.dispatch('showDropList')
        }
      }
    }
}
</script>

<style lang="scss">
    .table-size {
      padding: 5px;
      text-align: left;
      color: #666;
      input {
        width: 20%;
      }
      button {
        cursor: pointer;
      }
    }
</style>
