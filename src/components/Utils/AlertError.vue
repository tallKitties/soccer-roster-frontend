<template>
  <div id="utils-alert-error" class="container">
    <div
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {{ message }}

      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="alertClosed"
      >

        <span aria-hidden="true">&times;</span>

      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'utils-alert-error',
  props: ['message'],
  methods: {
    alertClosed: function () {
      this.$emit('alertClosed', '')
    }
  }
}
</script>

<style scoped>

</style>
