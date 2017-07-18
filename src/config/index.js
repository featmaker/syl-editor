let config = {
    menu: [
        'source', 'fontName', 'fontSize', 'bold', 'underline', 'strikeThrough',
        'color', 'alignLeft', 'alignCenter', 'alignRight', 'listOl', 'listUl', 'link',
        'picture', 'table', 'removeFormat', 'redo', 'undo', 'fullscreen'
    ],
    fontName: [
        'arial black', 'times new roman', 'Courier New'
    ],
    fontSize: [
        '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
    ],
    container: {
        height: 300,
        width: 500,
        content: '欢迎使用实验楼编辑器'
    }
}
export default {
    getConfig(name) {
        return config[name] ? config['name'] : config
    },
    setConfig(data) {
        if (data) {
            config = data
        }
    }
}