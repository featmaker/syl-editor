import {
    SHOW_DROP_LIST,
    UPDATE_CONTENT,
    UPDATE_SELECTED_VALUE,
    UPDATE_MENU_STATUS,
    EXEC_COMMAND,
    SET_FULLSCREEN,
    NODE_POSITION,
    CALL_METHOD
} from './mutations-types'

export default {
    [SHOW_DROP_LIST]({ menuBar }, data) {
        for (let menu in menuBar) {
            if (menuBar[menu].showDropList !== undefined) {
                if (data && data.name === menu) {
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
        for (name in data) {
            if (menuBar[name].showStatus) {
                menuBar[name].status = data[name]
            } else {
                menuBar[name].status = 'default'
            }
        }
    },
    [UPDATE_SELECTED_VALUE]({ menuBar }, data) {
        menuBar[data.name].value = data.value
    },
    [EXEC_COMMAND](state, data) {
        state.command = data
    },
    [CALL_METHOD](state, data) {
        state.callee = data
    },
    [NODE_POSITION](state, data) {
        state.position = {
            top: data.top,
            right: data.right,
            bottom: data.bottom + document.body.scrollTop,
            left: data.left
        }
    }
}