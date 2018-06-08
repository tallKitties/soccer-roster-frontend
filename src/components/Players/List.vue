<template>
  <div id="players-list">
    <headerNav/>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-left">
        Checkout our team!
      </h1>
    </div>
    <div class="container">
      <div class="col-12 col-sm-5 offset-sm-1">
        <ul class="list-group list-group-flush">
          <li v-for="player in players"
            :key="player.id"
            :player="player.full_name"
            class="row list-group-item list-group-item-action text-left"
          >

            <router-link :to="{
              name: 'players-show',
              params: { id: player.id }
            }">

              {{ player.full_name }}

            </router-link>
            <span>&#65112;</span>
            {{ player.position | capitalize }}
          </li>
        </ul>
      </div>
    </div>
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
      players: []
    }
  },
  methods: {
    fetchPlayers () {
      this.axios.get(this.path)
        .then(response => { this.players = response.data })
        .catch((error) => { alert('Something went wrong!\n' + error) })
    }
  },
  created () {
    this.fetchPlayers()
  }
}
</script>

<style scoped>

</style>
