<template>
  <div class="drop-list-item colors-list" v-show="stated.showDropList" :style="style">
      <div class="color-list-container">
          <div class="select-mode">
            前景色:<input type="radio" name="radio" id="fore-color" v-model="mode" value="0" checked="true" />
            背景色:<input type="radio" name="radio" id="back-color" v-model="mode" value="1" />
          </div>
          <div class="customize-color-value">
              <input placeholder='输入颜色值' v-model="value"/>
              <button @click="handleInput">确定</button>
          </div>
            <div class="color-dashboard">
                <a href="javascript:;" class="color-item"
                 v-for="color in colors"
                 :key="color"
                 :style="{backgroundColor: color}"
                  @click.stop="handleSelect($event, color)"
                 >
                </a>
            </div>
      </div>
  </div>
</template>

<script>
    import Config from '../../config/index'

    export default {
        data() {
            let colors = Config.getConfig('colors')
            return {
                mode: 0,
                colors,
                value: ''
            }
        },
        computed: {
            stated: function() {
                return this.$store.state.menuBar.color
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
            handleSelect($event, color) {
                this.$store.dispatch('execCommand', {
                    name: this.mode == 0 ? 'foreColor' : 'backColor',
                    value: color
                })
                this.$store.dispatch('showDropList');
            },
            handleInput() {
                let color = this.value
                let valid = this.checkValid(color)
                if(valid) {
                    this.$store.dispatch('execCommand', {
                        name: this.mode == 0 ? 'foreColor' : 'backColor',
                        value: color
                    })
                    this.$store.dispatch('showDropList');
                } else {
                    alert('请输入正确的颜色值');
                }
                this.value = ''
            },
            checkValid(color) {
                let code3 = /^#[0-9a-f]{3}$/i,
                    code6 = /^#[0-9a-f]{6}$/i,
                    rgb = /^rgb\((([\d|1[0-9]{2}|2{0-4}\d]|25[0-5]),){2}([\d|1[0-9]{2}|2{0-4}\d]|25[0-5])\)/;
                if(code3.test(color) || code6.test(color) || rgb.test(color)) {
                    return true
                } else {
                    return false
                }
            }
        },
        mounted() {

        }
    }
</script>
<style lang="scss">
    .color-dashboard {
        text-align: left;
        padding: 0 4px;
    }
    .color-item {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0 2px;
        cursor: pointer;
    }

    .select-mode {
        font-size: 14px;
        color: #666;
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
    .customize-color-value {
        color: #666;
        padding: 5px;
        input {
            outline: none;
        }
        button {
            cursor: pointer;
        }
    }
</style>

