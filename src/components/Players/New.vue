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
      <h1 class="pb-2 pt-4 border-bottom">
        Add to the roster
      </h1>
    </div>
    <div class="mb-5"></div>
    <b-row>
      <b-col sm="10" offset-sm="1" md="8" offset-md="2">
        <new-player-form :formType="'new'" @apiError="showError"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import newPlayerForm from '@/components/Forms/NewPlayerForm'
import alertError from '@/components/Utils/AlertError'

export default {

  components: {
    alertError,
    headerNav,
    newPlayerForm
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
