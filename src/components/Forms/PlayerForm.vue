<template>
  <sui-container text text-align="left" id="player-form">
    <sui-form @submit.prevent="createPlayer">
      <sui-form-field required>
        <sui-divider hidden/>
        <label>First Name</label>
        <sui-input placeholder="first name..." v-model="player.first_name"/>
      </sui-form-field>
      <sui-form-field required>
        <sui-divider hidden/>
        <label>Last Name</label>
        <sui-input placeholder="first name..." v-model="player.last_name"/>
      </sui-form-field>
      <sui-form-field required>
        <sui-divider hidden/>
        <label>Email</label>
        <sui-input
          placeholder="first name..."
          type="email"
          v-model="player.email"
        />
      </sui-form-field>
      <sui-form-field required>
        <sui-divider hidden/>
        <label>Age</label>
        <sui-input
          placeholder="Age"
          type="number"
          v-model.number="player.age"
        />
      </sui-form-field>
      <sui-button primary type="submit">Create</sui-button>
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
      console.log(this.player, this.$router.path)
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
  }
}
</script>

<style scoped>

</style>
