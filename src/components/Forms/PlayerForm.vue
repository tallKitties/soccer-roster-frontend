<template>
  <b-container id="player-form">
    <b-form-row>
      <b-col>
        <b-form @submit.prevent="createPlayer">
          <text-input v-model="player.first_name" :label="'First Name'" />
          <text-input v-model="player.last_name" :label="'Last name'" />

          <b-form-group id="email-input-group">
            <b-form-input id="email-input"
                          type="email"
                          required
                          placeholder="email"
                          aria-label="Email"
                          name="email"
                          data-vv-as="Email"
                          v-validate="'required|email'"
                          v-model="player.email">
            </b-form-input>
            <span
              v-show="errors.has('email')"
              class="text-danger">

              {{ errors.first('email') }}
            </span>
          </b-form-group>

          <b-form-group id="age-input-group">
            <b-form-input id="age-input"
                          type="number"
                          required
                          placeholder="age"
                          aria-label="Age"
                          name="age"
                          data-vv-as="Age"
                          v-validate="'required|between:1,100'"
                          v-model.number="player.age">
            </b-form-input>
            <span
              v-show="errors.has('age')"
              class="text-danger">

              {{ errors.first('age') }}
            </span>
          </b-form-group>

          <b-form-group id="position-select-group">
            <b-form-select  id="position-select"
                            :options="positions"
                            required
                            placeholder="position"
                            aria-label="Position"
                            name="position"
                            data-vv-as="Position"
                            v-validate="'required'"
                            v-model="player.position">
            </b-form-select>
            <span
              v-show="errors.has('position')"
              class="text-danger">

              {{ errors.first('position') }}
            </span>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="invalidSubmit">Submit</b-button>
        </b-form>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import textInput from '@/components/Forms/Inputs/TextInput'

export default {
  name: 'player-form',
  data () {
    return {
      player: {
        position: null,
        first_name: ''
      },
      positions: []
    }
  },

  components: {
    textInput
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
      let collection = []
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
    invalidSubmit: function () {
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
