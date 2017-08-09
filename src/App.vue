<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from './components/layout'

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {

  },
  components: {
    Layout
  }
}
</script>

<style>
@import '../static/font-awesome-4.7.0/css/font-awesome.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.syl-editor-menubar {
    min-height: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
}

</style>
