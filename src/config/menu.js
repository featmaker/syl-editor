let menu = {
    source: {
        className: 'syl-menu-source',
        icon: 'fa fa-code',
        action: 'viewSource',
        call: 'html'
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
        action: 'bold'
    },
    underLine: {
        className: 'syl-menu-underline',
        icon: 'fa fa-underline',
        action: 'underline'
    },
    strikeThrough: {
        className: 'syl-menu-strike',
        icon: 'fa fa-strikethrough',
        action: 'strikeThrough'
    },
    color: {
        className: 'syl-menu-color',
        icon: 'fa fa-paint-brush',
        dropList: true
    },
    alignLeft: {
        className: 'syl-menu-align-left',
        icon: 'fa fa-align-left',
        action: 'justifyLeft'
    },
    alignCenter: {
        className: 'syl-menu-align-center',
        icon: 'fa fa-align-center',
        action: 'justifyCenter'
    },
    alignRight: {
        className: 'syl-menu-align-center',
        icon: 'fa fa-align-right',
        action: 'justifyRight'
    },
    listOl: {
        className: 'syl-menu-ol',
        icon: 'fa fa-list-ol'
    },
    listUl: {
        className: 'syl-menu-ul',
        icon: 'fa fa-list-ul'
    },
    link: {
        className: 'syl-menu-link',
        icon: 'fa fa-link',
        dropList: true
    },
    unlink: {
        className: 'syl-menu-unlink',
        icon: 'fa fa-unlink'
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
    // fullscreen: {
    //     className: 'syl-menu-fullscreen',
    //     icon: 'fa fa-arrows-alt',
    //     action: 'fullscree'
    // }
}
export default {
    getMenu() {
        return menu;
    }
}