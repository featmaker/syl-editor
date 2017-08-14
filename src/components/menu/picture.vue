<template>
    <div class="drop-list-item picture-upload" v-show="stated.showDropList" :style="style">
        <div class="picture-upload-mode">
          <div class="select-mode">
            本地图片:<input type="radio" name="radio" id="radio1" v-model="mode" value="0" />
            在线图片:<input type="radio" name="radio" id="radio2" v-model="mode" value="1" />
          </div>
          <div class="picture-local" v-if="mode == 0">
            <form>
                <input type="file" name="" placeholder="请选择本地图片" ref="localimg">
                <button type="button" @click="handlePicture">确定</button>
            </form>
          </div>
          <div class="picture-online" v-if="mode == 1">
            <input type="text" name="" v-model="value" placeholder="输入图片url地址">
            <button type="button" @click="handlePicture">确定</button>
          </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            // 模式
            mode: 0,
            // 默认值
            value: this.$store.state.menuBar.picture.value
        }
    },
    computed: {
        stated: function() {
            return this.$store.state.menuBar.picture
        },
        style: function() {
            let position = this.$store.state.position
            return {
                top: position.bottom + 'px',
                left: position.left + 'px'
            }
        }
    },
    methods: {
        handlePicture() {
            // 本地图片
            if(this.mode == 0) {
                //local
                let imgfile = this.$refs.localimg.files
                let src = ''
                if(imgfile.length == 1 && imgfile[0].type.indexOf('image') != -1) {
                    src = window.URL.createObjectURL(imgfile[0])
                } else {
                    alert('请选择一张图片上传')
                    return false
                }
                this.$store.dispatch('execCommand', {
                    name: 'insertHTML',
                    value: `<img src="${src}" />`
                })
                this.$store.dispatch('showDropList')
                // window.URL.revokeObjectURL(src)
            } else {
                if (!this.value) {
                    alert('请输入图片的链接地址')
                    return
                }
                // 在线图片 url
                this.$store.dispatch('execCommand', {
                    name: 'insertHTML',
                    value: `<img src="${this.value}" />`
                })
                this.$store.dispatch('showDropList')
                this.value = ''
            }
        }
    }
}

</script>

<style lang="scss">
    .picture-upload-mode {
        button {
            cursor: pointer;
        }
    }
    .picture-online {
        padding: 5px;
        input {
            outline: none;
        }
    }
    .picture-local {
        padding: 5px;
        input {
            display: inline-block;
            width: 66%;
            outline: none
        }
    }
</style>
