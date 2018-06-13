<template>
  <div id="utils-alert-danger" class="container">
    <div
      class="alert alert-danger alert-dismissible fade show"
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
  name: 'utils-alert-danger',
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
