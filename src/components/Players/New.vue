<template>
  <div id="players-new">
    <header-nav/>
    <alert-error
      class="col-12"
      v-if="error"
      :message="error"
      @alertClosed="resetAlert"
    >
    </alert-error>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-left">
        Add to the roster
      </h1>
    </div>
    <player-form :formType="'new'" @apiError="showError"/>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import playerForm from '@/components/Forms/PlayerForm'
import alertError from '@/components/Utils/AlertError'

export default {

  components: {
    alertError,
    headerNav,
    playerForm
  },

  name: 'players-new',
  data () {
    return {
      player: {},
      error: ''
    }
  },

  methods: {
    showError: function (msg) {
      this.error = msg
    },
    resetAlert: function () {
      this.error = ''
    }
  }
}
</script>

<style scoped>

</style>
