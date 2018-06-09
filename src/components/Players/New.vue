<template>
  <div id="players-new">
    <header-nav/>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-left">
        Add to the roster
      </h1>
    </div>
    <player-form/>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'
import playerForm from '@/components/Forms/PlayerForm'

export default {
  components: {
    headerNav,
    playerForm
  },
  name: 'players-new',
  data () {
    return {
      player: {}
    }
  }
}
</script>

<style scoped>

</style>
