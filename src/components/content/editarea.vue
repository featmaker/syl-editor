<template>
  <div class="syl-editor-editarea">
    <div class="edit-area" contenteditable="true">
      {{ init }}
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {}
    },
    computed: {
      init: function() {
        return this.$store.state.content
      }
    }
}
</script>

<style lang="scss" scoped>
  .syl-editor-editarea {
    height: 458px;
    min-height: 458px;
    border-top: 1px solid #eee;
    text-align: left;
    padding: 10px 15px;
    .edit-area {
      height: 100%;
      outline: none;
      &:active {
        outline: none;
      }
    }
  }
</style>
