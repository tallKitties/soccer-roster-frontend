<template>
  <sui-container text text-align="left" id="player-form">
    <sui-form @submit.prevent="handleSubmit">

      <sui-form-field required>
        <sui-divider hidden/>
        <label for="first_name" class="visuallyhidden">First Name</label>
        <sui-input
          name="first_name"
          data-vv-as="First name"
          placeholder="first name..."
          type="text"
          v-validate="'required'"
          v-model="player.first_name"
        />
        <span
          v-show="errors.has('first_name')"
          class="text-danger">
            {{ errors.first('first_name')}}
        </span>
      </sui-form-field>

      <sui-form-field required>
        <sui-divider hidden/>
        <label for="last_name" class="visuallyhidden">Last Name</label>
        <sui-input
          name="last_name"
          data-vv-as="Last name"
          placeholder="last name..."
          type="text"
          v-model="player.last_name"
          v-validate="'required'"
        />
        <span
          v-show="errors.has('last_name')"
          class="text-danger">
            {{ errors.first('last_name')}}
        </span>
      </sui-form-field>

      <sui-form-field required>
        <sui-divider hidden/>
        <label for="email" class="visuallyhidden">Email</label>
        <sui-input
          name="email"
          data-vv-as="Email"
          placeholder="email..."
          type="email"
          v-model="player.email"
          v-validate="'required|email'"
        />
        <span
          v-show="errors.has('email')"
          class="text-danger">
            {{ errors.first('email')}}
        </span>
      </sui-form-field>

      <sui-form-field required>
        <sui-divider hidden/>
        <label for="age" class="visuallyhidden">Age</label>
        <sui-input
          name="age"
          data-vv-as="Age"
          placeholder="age..."
          type="number"
          v-model.number="player.age"
          v-validate="'required|between:1,100'"
        />
        <span
          v-show="errors.has('age')"
          class="text-danger">
            {{ errors.first('age')}}
        </span>
      </sui-form-field>

      <sui-form-field required>
        <sui-divider hidden/>
        <label for="position" class="visuallyhidden">Position</label>
        <sui-dropdown
          name="position"
          data-vv-as="Position"
          placeholder="position"
          selection
          :options="positions"
          v-model.number="player.position"
          v-validate="'required'"
        />
        <span
          v-show="errors.has('position')"
          class="text-danger">
            {{ errors.first('position')}}
        </span>
      </sui-form-field>

      <sui-divider/>
      <sui-divider hidden/>

      <sui-button fluid primary type="submit" :disabled="invalidSubmit">
          Add Player!
      </sui-button>

    </sui-form>
  </sui-container>
</template>

<script>
import textInput from '@/components/Forms/TextInput'

export default {

  components: {
    textInput
  },

  name: 'player-form',
  props: ['formType'],

  data () {
    return {
      player: { positions: null },
      positions: []
    }
  },

  methods: {
    handleSubmit (e) {
      formType === "new" ? createPlayer(e) : updatePlayer(e)
    },

    fetchPlayer () {
      this.axios.get('/players/' + this.id)
        .then(response => { this.player = response.data })
        .catch((e) => {
          console.log(e)
          this.$emit('apiError', e.response.data.error)
        })
    },

    updatePlayer (e) {
      this.axios.put('/players/' + this.id)
        .then(response => { this.player = response.data })
        .catch((e) => {
          console.log(e)
          this.$emit('apiError', e.response.data.error)
        })
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
    }
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
