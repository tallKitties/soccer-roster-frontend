<template>
  <div id="players-show">
    <header-nav/>
    <alert-error  class="col-12"
                  v-if="error"
                  :message="error"
                  @alertClosed="resetError" />
    <alert-success  class="col-12"
                    v-if="success"
                    :message="success"
                    @alertClosed="resetSuccess"/>

    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-center">
        {{ player.full_name }}
        <b-button variant="danger"
                  @click="destroyPlayer"
                  class="float-right">
          Delete {{ player.first_name }}
        </b-button>
      </h1>
    </div>
    <div class="mb-5"></div>
    <b-row>
      <b-col sm="10" offset-sm="1" md="8" offset-md="2">
        <edit-player-form :player="player"
                          @apiError="showError"
                          @success="showSuccess" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import editPlayerForm from '@/components/Forms/EditPlayerForm'
import alertError from '@/components/Utils/AlertError'
import alertSuccess from '@/components/Utils/AlertSuccess'

export default {
  components: {
    headerNav,
    editPlayerForm,
    alertError,
    alertSuccess
  },

  props: ['id'],

  name: 'players-show',

  data () {
    return {
      player: {},
      error: '',
      success: ''
    }
  },

  methods: {
    fetchPlayer () {
      this.axios.get('/players/' + this.id)
        .then(response => { this.player = response.data })
        .catch((e) => {
          alert('Something went wrong!\n\n' +
                e.response.data.error)
        })
    },

    destroyPlayer () {
      this.axios.delete('/players/' + this.id)
        .then(response => {
          this.$router.replace({ name: 'players-list' })
        })
        .catch((e) => {
          alert('Error deleting player!\n' + e)
        })
    },

    showError (msg) {
      this.error = msg
    },

    resetError () {
      this.error = ''
    },

    showSuccess (msg) {
      this.success = msg
    },

    resetSuccess () {
      this.success = ''
    }
  },

  created () {
    this.fetchPlayer()
  }
}
</script>

<style scoped>

</style>
p
