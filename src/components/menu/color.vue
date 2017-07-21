<template>
    <div class="syl-menu-item" v-show="stated.showDropList">
        hello world
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            stated: function() {
                return this.$store.state.menuBar.color
            }
        }
    }
</script>
