let menu = {
    items: {
        source: {
            className: 'syl-menu-source',
            icon: 'fa fa-code',
            action: 'viewSource'
        },
        fontName: {
            className: 'syl-menu-fontName',
            icon: 'fa fa-font'
        },
        fontSize: {
            className: 'syl-menu-fontSize',
            icon: 'fa fa-header'
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
            icon: 'fa fa-underline',
        },
        alignLeft: {
            className: 'syl-menu-align-left',
            icon: 'fa fa-align-left',
            action: 'alignLeft'
        },
        alignCenter: {
            className: 'syl-menu-align-center',
            icon: 'fa fa-align-center',
            action: 'alignCenter'
        },
        alignRight: {
            className: 'syl-menu-align-center',
            icon: 'fa fa-align-right',
            action: 'alignRight'
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
            icon: 'fa fa-link'
        },
        picture: {
            className: 'syl-menu-picture',
            icon: 'fa fa-picture-o'
        },
        table: {
            className: 'syl-menu-table',
            icon: 'fa fa-table'
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
        },
        fullscree: {
            className: 'syl-menu-fullscree',
            icon: 'fa fa-arrows-alt',
            action: 'fullscree'
        }
    }


}
export default {
    getMenu() {
        return menu;
    }
}