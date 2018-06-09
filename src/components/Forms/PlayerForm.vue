<template>
  <sui-container text text-align="left" id="player-form">
    <sui-form @submit.prevent="createPlayer">
      <sui-form-field required>
        <sui-divider hidden/>
        <label>First Name</label>
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
        <label>Last Name</label>
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
        <label>Email</label>
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
        <label>Age</label>
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
      <sui-button primary :disabled="invalidSubmit" type="submit">Create</sui-button>
    </sui-form>
  </sui-container>
</template>

<script>

export default {
  name: 'player-form',
  data () {
    return {
      player: {}
    }
  },
  methods: {
    createPlayer (e) {
      console.log(1)
      // console.log(this.fields)
      // this.axios.put('/players',
      // {
      //   player: this.player
      // })
      // .then(response => { this.$router.push(
      //   {
      //     name:'players-show',
      //     params: { id: respons.data.id }
      //   }
      // )})
    }
  },
  computed: {
    invalidSubmit: function () {
      let fieldNames = Object.keys(this.fields)
      return !fieldNames.every(key => this.fields[key].valid)
    }
  }
}
</script>

<style scoped>

</style>
