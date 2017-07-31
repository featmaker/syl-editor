let menu = {
    source: {
        className: 'syl-menu-source',
        icon: 'fa fa-code',
        action: 'viewSource',
        showStatus: true
    },
    fontName: {
        className: 'syl-menu-fontName',
        icon: 'fa fa-font',
        dropList: true
    },
    fontSize: {
        className: 'syl-menu-fontSize',
        icon: 'fa fa-header',
        dropList: true
    },
    bold: {
        className: 'syl-menu-bold',
        icon: 'fa fa-bold',
        action: 'bold',
        showStatus: true
    },
    underLine: {
        className: 'syl-menu-underline',
        icon: 'fa fa-underline',
        action: 'underline',
        showStatus: true
    },
    strikeThrough: {
        className: 'syl-menu-strike',
        icon: 'fa fa-strikethrough',
        action: 'strikeThrough',
        showStatus: true
    },
    color: {
        className: 'syl-menu-color',
        icon: 'fa fa-paint-brush',
        dropList: true
    },
    justifyLeft: {
        className: 'syl-menu-align-left',
        icon: 'fa fa-align-left',
        action: 'justifyLeft',
    },
    justifyCenter: {
        className: 'syl-menu-align-center',
        icon: 'fa fa-align-center',
        action: 'justifyCenter',
    },
    justifyRight: {
        className: 'syl-menu-align-center',
        icon: 'fa fa-align-right',
        action: 'justifyRight',
    },
    insertOrderedList: {
        className: 'syl-menu-ol',
        icon: 'fa fa-list-ol',
        action: 'insertOrderedList'
    },
    insertUnorderedList: {
        className: 'syl-menu-ul',
        icon: 'fa fa-list-ul',
        action: 'insertUnorderedList'
    },
    link: {
        className: 'syl-menu-link',
        icon: 'fa fa-link',
        dropList: true
    },
    unlink: {
        className: 'syl-menu-unlink',
        icon: 'fa fa-unlink',
        action: 'unlink'
    },
    picture: {
        className: 'syl-menu-picture',
        icon: 'fa fa-picture-o',
        dropList: true
    },
    table: {
        className: 'syl-menu-table',
        icon: 'fa fa-table',
        dropList: true
    },
    removeFormat: {
        className: 'syl-menu-remove-format',
        icon: 'fa fa-eraser',
        action: 'removeFormat'
    },
    redo: {
        className: 'syl-menu-redo',
        icon: 'fa fa-repeat',
        action: 'redo'
    },
    undo: {
        className: 'syl-menu-undo',
        icon: 'fa fa-undo',
        action: 'undo'
    }
}
export default {
    getMenu() {
        return menu;
    }
}