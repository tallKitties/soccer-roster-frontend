<template>
  <b-container id="edit-player-form">
    <b-form-row>
      <b-col>
        <b-form @submit.prevent="updatePlayer">
          <input-field  v-model="playerInfo.first_name"
                        :label="'First Name'" />
          <input-field  v-model="playerInfo.last_name"
                        :label="'Last name'" />
          <input-field  v-model="playerInfo.email"
                        :label="'Email'"
                        :inputType="'email'" />
          <input-field  v-model="playerInfo.age"
                        :label="'Age'"
                        :inputType="'number'"
                        :validations="{ between: [ 1,100 ] }" />
          <input-select v-model="playerInfo.position"
                        :label="'Position'"
                        :options="positions" />
          <b-button type="submit" variant="primary" :disabled="invalidSubmit">Update</b-button>
        </b-form>
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script>
import inputField from '@/components/Forms/Inputs/InputField'
import inputSelect from '@/components/Forms/Inputs/InputSelect'

export default {
  name: 'edit-player-form',

  components: {
    inputField,
    inputSelect
  },

  props: ['player'],

  data () {
    return {
      positions: []
    }
  },

  methods: {

    updatePlayer (e) {
      this.axios.patch(
        '/players/' + this.player.id,
        { player: this.playerInfo })
        .then(response => {
          this.playerInfo = response.data
          this.$emit('success', this.playerInfo.first_name + ' was updated.')
        })
        .catch((e) => {
          console.log(e)
          this.$emit('apiError', 'Error updating player')
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
    }
  },

  computed: {
    invalidSubmit () {
      let fieldNames = Object.keys(this.fields)
      return !fieldNames.every(key => this.fields[key].valid)
    },

    playerInfo () {
      return this.player
    }
  },

  created () {
    this.getPostions()
  }
}
</script>

<style scoped>

</style>
