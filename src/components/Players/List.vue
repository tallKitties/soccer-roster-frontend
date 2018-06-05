<template>
  <div id="list">
    <div class="row">
      <div class="col-10 offset-1">
        <div v-for="player in players" :key="player.id" :player="player.full_name">
          {{ player.full_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Players',
  data () {
    return {
      players: []
    }
  },
  created () {
    this.axios.get('http://localhost:3030/api/v1')
      .then(request => { this.players = request.data })
      .catch(() => { alert('Something went wrong!') })
  }
}
</script>

<style>

</style>
