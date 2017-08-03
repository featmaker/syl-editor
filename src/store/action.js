export default {
    showDropList({ commit }, data) {
        commit('SHOW_DROP_LIST', data)
    },
    updateContent({ commit }, data) {
        commit('UPDATE_CONTENT', data)
    },
    updateSelectValue({ commit }, data) {
        commit('UPDATE_SELECTED_VALUE', data)
    },
    updateMenuStatus({ commit }, data) {
        commit('UPDATE_MENU_STATUS', data)
    },
    execCommand({ commit }, data) {
        commit('EXEC_COMMAND', data)
    },
    // setFullScreen({ commit }, data) {
    //     commit('SET_FULLSCREEN', data)
    // },
    getNodePosition({ commit }, data) {
        commit('NODE_POSITION', data)
    },
    callMethod({ commit }, data) {
        commit('CALL_METHOD', data)
    },
    changeView({ commit }, data) {
        commit('CHANGE_VIEW', data)
    }
}