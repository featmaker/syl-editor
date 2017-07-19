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

<style>
  .syl-editor-editarea {
    min-height: 469px;
    border-top: 1px solid #eee;
  }
</style>
