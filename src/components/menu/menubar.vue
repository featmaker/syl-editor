<template>
  <div class="syl-editor-menubar">
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
import fontName from './fontName'

export default {
  data() {
    let { viewMenu } = Config.getConfig();
    let menus = Menu.getMenu();
    return {
      viewMenu,
      menus,
      lang,
      fontName: 'fontNamedddd'
    }
  },
  computed: {
    stated: function() {
      return this.$store.state.menuBar
    }
  },
  methods: {
    getDropList(menu) {
        console.log(this.dropList[menu])
        return this.dropList[menu]
    },
    handleEvent($event, menu) {
        if(this.stated[menu].status == 'disable') { return}
        this.showDropList(menu)
        this.updateMenu(menu)
    },
    showDropList(menu) {
        if(this.menus[menu].dropList) {
            this.$store.dispatch('showDropList', {
                name: menu,
                display: !this.$store.state.menuBar[menu].showDropList
            })
        }
    },
    updateMenu(menu) {
        let state = {
            name: menu,
            status: 'default'
        };
        if(this.menus[menu].action) {
            if(this.menus[menu].call) {
                this.$store.dispatch('callMethod',{
                    name: menu,
                    params: null
                })
            } else {
                this.$store.dispatch('execCommand', this.menus[menu].action)
                if(this.stated[menu].status) {
                    state.status = this.stated[menu].status == 'active' ? 'default' : 'active'
                }
            }
        }
        this.$store.dispatch('updateMenuStatus', state)
    }
  }
}
</script>

<style lang='scss' scoped>
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
