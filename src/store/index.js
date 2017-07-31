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
        if (menu[name].showStatus) {
            menuBar[name].showStatus = true
        }
        menuBar[name].status = 'default'
    }
})

export default new Vuex.Store({
    state: {
        content: config.container.content,
        menuBar,
        sourceView: false,
        command: {
            name: '',
            value: ''
        },
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }
    },
    actions,
    mutations,
})