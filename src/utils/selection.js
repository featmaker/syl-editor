export default {
    getRange: function() {
        let sel = window.getSelection()
        if (sel && sel.rangeCount != 0) {
            return sel.getRangeAt(0)
        }
    },
    saveRange: function(range) {
        if (range) {
            this._range = range
            return
        }
        let range = getRange()
    }

}