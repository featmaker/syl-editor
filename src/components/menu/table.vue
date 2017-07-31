<template>
    <div class="drop-list-item table-insert" v-show="stated.showDropList" :style="style">
        <div class="table-size">
          <input type="number" name="" v-model="rows" min="1">行 X
          <input type="number" name="" v-model="cols" min="1"> 列
          <button type="button" @click="handleTable">确定</button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            cols: 1,
            rows: 1
        }
    },
    computed: {
        stated: function() {
            return this.$store.state.menuBar.table
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
      handleTable() {
        if(this.rows > 0 && this.cols > 0) {
          let table = this.createTable(this.rows, this.cols)
          console.log(table)
          this.$store.dispatch('execCommand', {
              name: 'insertHTML',
              value: table
          })
          this.$store.dispatch('showDropList')
        }
      },
      createTable(rows, cols) {
        // let table = `<table>`
        //   for(let i = 0; i < this.rows; i++) {
        //     table += `<tr>`
        //     for(let j = 0; j < this.cols; j++) {
        //       table += '<td></td>'
        //     }
        //     table += '</tr>'
        //   }
        //   table += '</table>'
        let table = document.createElement('table')
        let tbody = document.createElement('tbody')
        for(let i = 0; i < rows; i++) {
          let tr = document.createElement('tr')
          for (let j = 0; j < cols; j++) {
            let td = document.createElement('td')
            tr.appendChild(td)
          }
          tbody.appendChild(tr)
        }
        table.appendChild(tbody)
        return table.outerHTML
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
