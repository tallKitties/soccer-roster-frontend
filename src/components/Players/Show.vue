<template>
  <div id="players-show">
    <headerNav/>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-left">
        {{ player.full_name }}
      </h1>
    </div>
    <div class="container">
      <div class="col-12 col-sm-5 offset-sm-1">
        <div class="row">
          Name: {{ player.full_name }}
        </div>
        <div class="row">
          Age: {{ player.age }}
        </div>
        <div class="row">
          Position: {{ player.position }}
        </div>
        <div class="row">
          Email: {{ player.email }}
        </div>
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
  props: ['id'],
  name: 'players-show',
  data () {
    return {
      player: {}
    }
  },
  methods: {
    fetchPlayer () {
      this.axios.get('/players/' + this.id)
        .then(response => { this.player = response.data })
        .catch((e) => {
          alert('Something went wrong!\n\n' +
                e.response.data.error)
        })
    }
  },
  created () {
    this.fetchPlayer()
  }
}
</script>

<style scoped>

</style>
p
