<template>
  <div class="hello syl-editor">
    <Menubar></Menubar>
    <Editarea></Editarea>
  </div>
</template>

<script>
import Menubar from './menu/menubar'
import Editarea from './content/editarea'
import Color from './menu/color'


export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Menubar,
    Editarea,
    Color
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.syl-editor {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    border: 1px solid #eee;
}
</style>
