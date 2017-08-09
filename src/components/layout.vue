<template>
  <div class="hello syl-editor">
    <syl-menubar></syl-menubar>
    <syl-editarea></syl-editarea>
    <div class="drop-list">
        <div v-for="item in list" :key="item">
          <component :is="'syl-' + item"></component>
        </div>
    </div>
    <SourceCode></SourceCode>
  </div>

</template>

<script>
import Menubar from './menu/menubar'
import Editarea from './content/editarea'
import Color from './menu/color'
import FontName from './menu/fontName'
import FontSize from './menu/fontSize'
import Picture from './menu/picture'
import Table from './menu/table'
import Link from './menu/link'
import SourceCode from './menu/source'


export default {
  name: 'layout',
  data () {
    return {
      list: ['fontname','color', 'fontsize', 'picture','table', 'link']
    }
  },
  components: {
    'syl-fontname': FontName,
    'syl-menubar': Menubar,
    'syl-editarea': Editarea,
    'syl-color': Color,
    'syl-fontsize': FontSize,
    'syl-picture': Picture,
    'syl-table': Table,
    'syl-link': Link,
    SourceCode
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1, h2 {
  font-weight: normal;
}

// ul {
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
// }

li {
  // display: inline-block;
  margin: 0;
}

a {
  color: #42b983;
  cursor: pointer;
}

table {
    width: 100%;
    margin: 5px 0 10px 0;
    tr {
        td {
            min-width: 50px;
            padding: 5px;
            border-left: 1px solid #ddd;
            border-top: 1px solid #ddd;
            &:last-child {
                border-right: 1px solid #ddd;
            }
        }
        &:last-child {
            td {
                border-bottom: 1px solid #ddd;
            }
        }
    }
}

img {
    max-width: 100%;
    max-height: auto;
}


.syl-editor {
    // position: relative;
    max-width: 1000px;
    // height: 500px;
    margin: 0 auto;
}

.drop-list-item {
  // display: inline-block;
  max-width: 200px;
  position: absolute;
  border: 1px solid #eee;
  background: #fff;
  li {
    border-bottom: 1px solid #eee;
    a {
        display: inline-block;
        text-decoration: none;
        color: #666;
    }
    &:last-child {
      border: none;
    }
  }
  &:before {
    content: ' '
  }
}
</style>
