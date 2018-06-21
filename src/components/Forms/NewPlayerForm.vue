<template>
  <b-container id="new-player-form">
    <b-form-row>
      <b-col>
        <b-form @submit.prevent="createPlayer">
          <input-field  v-model="player.first_name" :label="'First Name'" />
          <input-field  v-model="player.last_name" :label="'Last name'" />
          <input-field  v-model="player.email"
                        :label="'Email'"
                        :inputType="'email'" />
          <input-field  v-model="player.age"
                        :label="'Age'"
                        :inputType="'number'"
                        :validations="{ between: [ 1,100 ] }" />
          <input-select v-model="player.position"
                        :label="'Position'"
                        :options="positions" />
          <b-button type="submit" variant="primary" :disabled="invalidSubmit">Submit</b-button>
        </b-form>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import inputField from '@/components/Forms/Inputs/InputField'
import inputSelect from '@/components/Forms/Inputs/InputSelect'

export default {
  name: 'new-player-form',
  data () {
    return {
      player: {
        position: null,
        first_name: '',
        last_name: '',
        email: '',
        age: null
      },
      positions: []
    }
  },

  components: {
    inputField,
    inputSelect
  },

  methods: {

    createPlayer (e) {
      this.axios.post('/players', { player: this.player })
        .then(response => {
          this.goToPlayerShow(response)
        })
        .catch((e) => {
          console.log(e)
          this.$emit('apiError', 'Error creating player')
        })
    },

    getPostions () {
      this.axios.get('/players/positions')
        .then(response => {
          this.positions =
            this.buildPositionsCollection(response.data.positions)
        })
        .catch((e) => {
          console.log(e)
          this.$emit('apiError', 'Error getting positions')
        })
    },

    buildPositionsCollection (positions) {
      let collection = [{
        text: 'position',
        value: null,
        disabled: true
      }]

      positions.forEach((position) => {
        let positionUc = this.$options.filters.capitalize(position)
        collection.push({ text: positionUc, value: position })
      })

      return (collection)
    },

    goToPlayerShow (response) {
      this.$router.push(
        {
          name: 'players-show',
          params: { id: response.data.id }
        }
      )
    }
  },

  computed: {
    invalidSubmit () {
      let fieldNames = Object.keys(this.fields)
      return !fieldNames.every(key => this.fields[key].valid)
    }
  },

  created () {
    this.getPostions()
  }
}
</script>

<style scoped>

</style>
