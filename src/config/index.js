let config = {
    viewMenu: [
        'source',
        'fontName',
        'fontSize',
        'bold',
        'underLine',
        'strikeThrough',
        'color',
        'alignLeft',
        'alignCenter',
        'alignRight',
        'listOl',
        'listUl',
        'link',
        'picture',
        'table',
        'removeFormat',
        'redo',
        'undo',
        'fullscreen'
    ],
    fontName: [
        'arial black', 'times new roman', 'Courier New'
    ],
    fontSize: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    colors: [
        '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
        '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
        '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
        '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
        '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
        '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
        '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
        '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
    ],
    container: {
        height: 300,
        width: 500,
        content: '欢迎使用实验楼编辑器'
    }
}
export default {
    getConfig(name) {
        return config[name] ? config[name] : config
    },
    setConfig(data) {
        if (data) {
            config = data
        }
    }
}