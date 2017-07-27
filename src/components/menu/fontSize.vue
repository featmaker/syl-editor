<template>
    <div class="drop-list-item font-size-list" v-show="stated.showDropList" :style="style">
        <ul class="font-size-list">
          <li class="font-size" v-for="size in fontSize" :key="size">
              <a href="javascript:;"
                :class="[ value == size ? 'active' : '', 'font-size-' + size]"
                @click="handleSelect($event, size)"
                >
                <span>{{ size }}</span>
              </a>
            </li>
        </ul>
    </div>
</template>

<script>
import Config from '../../config/index'

export default {
    data() {
        let fontSize = Config.getConfig('fontSize')
        return {
            fontSize,
            value: this.$store.state.menuBar.fontSize.value
        }
    },
    watch: {
    //   'show': function(val) {
    //       console('name'+ val)
    //     if(!val) {
    //       this.$store.dispatch('getNodePosition', {})
    //     }
    //   }
    },
    computed: {
        stated: function() {
            return this.$store.state.menuBar.fontSize
        },
        // show: function() {
        //     return this.stated.showDropList
        // },
        style: function() {
            let position = this.$store.state.position
            return {
                top: position.bottom + 'px',
                left: position.left + 'px'
            }
        }
    },
    methods: {
      handleSelect($event, size) {
        this.$store.dispatch('updateSelectValue', {
          name: 'fontSize',
          value: size
        })
        this.$store.dispatch('execCommand', {
          name: 'formatblock',
          value: size
        })
        this.$store.dispatch('showDropList');
      }
    },
    mounted() {
      this.$store.dispatch('updateSelectValue', {
        name: 'fontSize',
        value: this.value || this.fontSize[2]
      })
    }
}
</script>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .font-size {
        padding: 0;
        a {
            width: auto;
            padding: 12px 20px;
        }
        &:hover {
            background: #eee;
        }
    }
    .font-size-h1 {
        font-size: 40px;
        line-height: 32px;
    }
    .font-size-h2 {
        font-size: 32px;
        line-height: 32px;
    }
    .font-size-h3 {
        font-size: 24px;
    }
    .font-size-h4 {
        font-size: 21px;
    }
    .font-size-h5 {
        font-size: 18px;
    }
    .font-size-h6 {
        font-size: 16px;
    }
</style>
