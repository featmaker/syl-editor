<template>
  <div class="syl-editor-menubar">
      <div v-for="menu in viewMenu" :key="menu" class="menubar-item">
          <a href="javascript:;"
            :class="[ stated[menu].status , menus[menu].className ]"
            @click.stop="handleEvent($event, menu)"
            :title="lang[menu].title"
          >
          <i :class="menus[menu].icon" aria-hidden="true"></i>
          </a>
        </div>
  </div>
</template>

<script>
import Config from '../../config/index'
import Menu from '../../config/menu'
import lang from '../../config/lang'

export default {
  data() {
    let { viewMenu } = Config.getConfig();
    let menus = Menu.getMenu();

    return {
      viewMenu,
      menus,
      lang
    }
  },
  computed: {
    stated: function() {
      return this.$store.state.menuBar
    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
  .menubar-item {
    display: inline-block;
    width: 5%;
    >a {
      color: #666;
    }
  }
</style>
