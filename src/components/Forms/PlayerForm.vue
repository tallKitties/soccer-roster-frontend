<template>
  <sui-container text text-align="left" id="player-form">
    <sui-form @submit.prevent="createPlayer">
      <sui-form-field required>
        <sui-divider hidden/>
        <label for="first_name" class="visuallyhidden">First Name</label>
        <sui-input
          name="first_name"
          data-vv-as="First name"
          placeholder="first name..."
          type="text"
          v-model="player.first_name"
          v-validate="'required'"
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
      <sui-button primary :disabled="invalidSubmit" type="submit">Create</sui-button>
    </sui-form>
  </sui-container>
</template>

<script>

export default {
  directives: { focus: focus },
  name: 'player-form',
  data () {
    return {
      player: { positions: null },
      positions: []
    }
  },

  methods: {
    createPlayer (e) {
      this.axios.post('/players', { player: this.player })
        .then(response => {
          this.$router.push(
            {
              name: 'players-show',
              params: { id: response.data.id }
            }
          )
        })
        .catch((e) => {
          alert('Error creating player ' + this.player.first_name)
        })
    },

    getPostions () {
      this.axios.get('/players/positions')
        .then(response => {
          this.positions =
            this.buildPositionsCollection(response.data.positions)
        })
        .catch((e) => {
          console.log('Error getting positions\n' + e)
        })
    },

    buildPositionsCollection (positions) {
      let collection = []
      positions.forEach((position) => {
        let positionUc = this.$options.filters.capitalize(position)
        collection.push({ text: positionUc, value: position })
      })
      return (collection)
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
  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
</style>
