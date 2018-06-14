<template>
  <b-container id="player-form">
    <b-form-row>
      <b-col>
        <b-form @submit.prevent="createPlayer">
          <b-form-group id="first-name-input-group"
                        label="First Name"
                        label for="first-name-field"
                        class="sr-only">
            <b-form-input id="first-name-field"
                          type="text"
                          required
                          placeholder="first name"
                          v-validate="'required'"
                          v-model="player.first_name">
            </b-form-input>
            <span
              v-show="errors.has('first_name')"
              class="text-danger">

              {{ errors.first('first_name')}}
            </span>
          </b-form-group>

          <b-form-group id="last-name-input-group"
                        label="Last Name"
                        for="last-name-field"
                        class="sr-only">
            <b-form-input id="last-name-field"
                          type="text"
                          required
                          placeholder="last name"
                          v-model="player.last_name"
                          v-validate="'required'">
            </b-form-input>
            <span
              v-show="errors.has('last_name')"
              class="text-danger">

              {{ errors.first('last_name')}}
            </span>
          </b-form-group>

          <b-form-group id="email-input-group"
                        label="Email"
                        for="email"
                        class="sr-only">
            <b-form-input id="email-input-field"
                          type="email"
                          required
                          placeholder="email"
                          v-model="player.email"
                          v-validate="'required|email'">
            </b-form-input>
            <span
              v-show="errors.has('email')"
              class="text-danger">

              {{ errors.first('email')}}
            </span>
          </b-form-group>>

          <b-form-group id="age-input-group"
                        label="Age"
                        for="age"
                        class="sr-only">
            <b-form-input id="age-input-field"
                          type="number"
                          required
                          placeholder="age"
                          v-model.number="player.age"
                          v-validate="'required|between:1,100'">
            </b-form-input>
            <span
              v-show="errors.has('age')"
              class="text-danger">
                {{ errors.first('age')}}
            </span>
          </b-form-group>>

          <b-form-group id="position-select-group"
                        label="Position"
                        for="position"
                        class="sr-only">
            <b-form-select  id="position-select-field"
                            :options="positions"
                            required
                            placeholder="position"
                            v-model.number="player.position"
                            v-validate="'required'">
            </b-form-select>
            <span
              v-show="errors.has('position')"
              class="text-danger">
                {{ errors.first('position')}}
            </span>
          </b-form-group>>
          <b-button type="submit" :disabled="invalidSubmit">Submit</button>
        </form>
  </div>
</template>

<script>
export default {
  name: 'player-form',
  data () {
    return {
      player: { position: null },
      positions: []
    }
  },


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
        params: { id: response.data.id,  }
      }
    )
  },

  computed: {
    invalidSubmit: function () {
      let fieldNames = Object.keys(this.fields)
      console.log(this.fields)
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
