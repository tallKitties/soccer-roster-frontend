<template>
  <div id="players-new">
    <headerNav/>
    <div class="container clearfix">
      <h1 class="pb-2 pt-4 border-bottom text-left">
        Add to the roster
      </h1>
    </div>
  </div>
</template>

<script>
import headerNav from '@/components/Nav'

export default {
  components: {
    headerNav
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
