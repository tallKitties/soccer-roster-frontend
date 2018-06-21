<template>
  <div id="players-list">
    <header-nav/>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 text-center">
        Checkout our team!
      </h1>
    </div>
    <b-container>
      <b-row>
        <b-col sm="8" offset-sm="2">
          <b-table hover :items="players" :fields="fields">
            <template slot="full_name" slot-scope="data">
              <b-link :to=" {
                              name: 'players-edit',
                              params: { id: data.item.id }
                            }">
                {{ data.item.full_name }}
              </b-link>
            </template>
            <template slot="delete" slot-scope="data">
              <b-button size="sm"
                        variant="danger"
                        @click="destroyPlayer(data.item.id, data.index)">
                &times;
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'

export default {
  components: {
    headerNav
  },

  name: 'players-list',

  data () {
    return {
      fields: [
        { key: 'full_name', label: 'Name' },
        'age',
        'position',
        { key: 'delete', label: '' }
      ],
      players: []
    }
  },

  methods: {
    fetchPlayers () {
      this.axios.get(this.path)
        .then(response => { this.players = response.data })
        .catch((error) => { alert('Something went wrong!\n' + error) })
    },

    destroyPlayer (id, index) {
      this.axios.delete('/players/' + id)
        .then(response => {
          if (response.data.success === true) {
            this.removePlayerFromPage(index)
          }
        })
        .catch((error) => { alert('Error deleting player\n' + error) })
    },

    removePlayerFromPage (index) {
      this.players.splice(index, 1)
    }
  },

  created () {
    this.fetchPlayers()
  }
}
</script>

<style scoped>

</style>
