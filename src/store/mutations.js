import {
    SHOW_DROP_LIST,
    UPDATE_CONTENT,
    UPDATE_SELECTED_VALUE,
    UPDATE_MENU_STATUS,
    EXEC_COMMAND,
    SET_FULLSCREEN,
    CALL_METHOD
} from './mutations-types'

export default {
    [SHOW_DROP_LIST]({ menuBar }, data) {
        for (let menu in menuBar) {
            if (menuBar[menu].dropList !== undefined) {
                if (data.name === menu) {
                    menuBar[menu].showDropList = data.display
                } else {
                    menuBar[menu].showDropList = false
                }
            }
        }
    },
    [UPDATE_CONTENT](state, data) {
        state.content = data
    },
    [UPDATE_MENU_STATUS]({ menuBar }, data) {
        if (data.name == 'all') {
            for (name in menuBar) {
                menuBar[name].status = data.status
            }
            return
        }
        if (data.name == 'group') {
            for (let item in data.group) {
                menuBar[item.name] = item.status
            }
            return
        }
        menuBar[data.name].status = data.status
    },
    [UPDATE_SELECTED_VALUE]({ menuBar }, data) {
        menuBar[data.name].value = data.value
    },
    [EXEC_COMMAND](state, data) {
        state.command = data
    },
    [CALL_METHOD](state, data) {
        state.callee = data
    }
}