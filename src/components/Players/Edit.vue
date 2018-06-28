<template>
  <div id="players-edit">
    <header-nav/>
    <b-alert  :variant="alertType"
              fade
              dismissible
              :show="showAlert"
              @dismissed="showAlert=false">
      {{ alertMessage }}
    </b-alert>

    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-center">
        {{ player.full_name }}
      </h1>
      <b-button variant="danger"
                @click="destroyPlayer"
                class="float-right">
        Delete {{ player.first_name }}
      </b-button>
    </div>
    <div class="mb-5"></div>
    <b-row>
      <b-col sm="10" offset-sm="1" md="8" offset-md="2">
        <edit-player-form :player="player" @alert="activateAlert" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import editPlayerForm from '@/components/Forms/EditPlayerForm'

export default {
  components: {
    headerNav,
    editPlayerForm
  },

  props: ['id'],

  name: 'players-edit',

  data () {
    return {
      player: {},
      alertType: '',
      showAlert: false,
      alertMessage: ''
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

    activateAlert (alert) {
      this.alertType = alert.type
      this.alertMessage = alert.message
      this.showAlert = true
    }
  },

  created () {
    this.fetchPlayer()
  }
}
</script>

<style scoped>

</style>
