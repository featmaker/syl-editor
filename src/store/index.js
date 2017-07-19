import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import Menu from '../config/menu'
import Config from '../config/index'

Vue.use(Vuex)
let menuBar = {};
let menu = Menu.getMenu();
let config = Config.getConfig();
let viewMenu = config.viewMenu;

viewMenu.forEach(function(name) {
    menuBar[name] = {}
    if (menu[name].dropList) {
        menuBar[name].value = ''
        menuBar[name].showDropList = false
    } else {
        menuBar[name].status = 'default'
    }
})

export default new Vuex.Store({
    state: {
        content: '欢迎使用实验楼编辑器',
        menuBar,
        fullScreen: false,
        command: {
            name: '',
            value: ''
        },
        calee: {
            name: '',
            params: ''
        }
    },
    actions,
    mutations,
})