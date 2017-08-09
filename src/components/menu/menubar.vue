<template>
  <div class="syl-editor-menubar" id="syl-editor-menubar">
      <div v-for=" menu in viewMenu" :key="menu" class="menubar-item">
          <a href="javascript:;"
            :class="[ stated[menu].status , menus[menu].className ]"
            @click.stop="handleEvent($event, menu)"
            :title="lang[menu].title"
          >
          <span>
              <i :class="menus[menu].icon" aria-hidden="true"></i>
          </span>
          <span v-if="menus[menu].dropList">
            <i :class="['drop-list-icon', stated[menu].showDropList ? 'fa fa-angle-up' : 'fa fa-angle-down' ]" aria-hidden="true"></i>
          </span>
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
      lang,
    }
  },
  computed: {
    stated: function() {
      return this.$store.state.menuBar
    }
  },
  methods: {
    handleEvent($event, menu) {
        if(this.stated[menu].status == 'disable') { return }
        this.showDropList($event, menu)
        this.updateMenu(menu)
    },
    showDropList($event, menu) {
        if(this.menus[menu].dropList) {
            this.$store.dispatch('showDropList', {
                name: menu,
                display: !this.$store.state.menuBar[menu].showDropList
            })
            this.$store.dispatch('getNodePosition', $event.currentTarget.getBoundingClientRect())
        }
    },
    updateMenu(menu) {
        let state = {};
        if(this.menus[menu].action) {
            this.$store.dispatch('execCommand', {
                name: this.menus[menu].action,
                value: null
            })
            if(this.stated[menu].status) {
                state[menu] = this.stated[menu].status == 'active' ? 'default' : 'active'
            }
        }
        this.$store.dispatch('updateMenuStatus', state)
    }
  }
}
</script>

<style lang='scss' scoped>
  .syl-editor-menubar {
      border: 1px solid #666;
      border-bottom: none
  }
  .menubar-item {
    display: flex;
    height: 40px;
    width: 5%;
    padding: 0 1px;
    align-content: center;
    justify-content: center;
    >a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 100%;
      color: #666;
      &.active {
          background: #eee;
      }
      &.default {
          background: #fff;
      }
      &.disable {
        background: #eee;
        cursor: not-allowed;
        opacity: .5;
      }
      &:hover {
        background: #eee;
      }
    }
  }
  .drop-list-icon {
    font-size: 12px;
    margin-left: 5px;
  }

</style>
