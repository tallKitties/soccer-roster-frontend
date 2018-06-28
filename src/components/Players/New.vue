<template>
  <div id="players-new">
    <header-nav/>
    <alert-error  class="col-12"
                  v-if="error"
                  :message="error"
                  @alertClosed="resetError" />
    <alert-success  class="col-12"
                    v-if="success"
                    :message="success"
                    @alertClosed="resetSuccess"/>

    <b-alert  variant="success"
              dismissible
              :show="success"
              :dismissed="success=''" />

    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-center">
        Add to the roster
      </h1>
    </div>

    <div class="mb-5"></div>
    <b-row>
      <b-col sm="10" offset-sm="1" md="8" offset-md="2">
        <new-player-form  @error="showError"
                          @success="showSuccess"
                          @danger="showDanger" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import newPlayerForm from '@/components/Forms/NewPlayerForm'
import alertError from '@/components/Utils/AlertError'
import alertSuccess from '@/components/Utils/AlertSuccess'
import alertDanger from '@/components/Utils/AlertDanger'

export default {

  components: {
    alertError,
    alertSuccess,
    alertDanger,
    headerNav,
    newPlayerForm
  },

  name: 'players-new',
  data () {
    return {
      player: {},
      error: '',
      success: ''
    }
  },

  methods: {
    showError: function (msg) {
      this.error = msg
    },

    resetAlert: function () {
      this.error = ''
    },

    showSuccess (msg) {
      this.success = msg
    },

    resetSuccess () {
      this.success = ''
    }
  }
}
</script>

<style scoped>

</style>
