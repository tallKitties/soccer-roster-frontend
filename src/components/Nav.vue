<template>
  <header>
<!--     <nav id="header-nav" class="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <router-link to="/" class="navbar-brand">Players</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'players-new'}" class="nav-link">
              Add Player<span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
        <form class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search for Players" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav> -->
    <nav>
      <b-navbar toggleable="md"
                type="light"
                variant="light"
                fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <b-link :to="{ name: 'players-index' }">
            Players
          </b-link>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item>
              <b-link :to="{ name: 'players-new' }">
                Add Player
              </b-link>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form @submit.prevent="searchPlayers">
              <b-form-input size="md"
                            class="mr-sm-2"
                            type="text"
                            v-model="query"
                            placeholder="Search for name"/>
              <b-button size="md"
                        class="my-2 my-sm-0"
                        type="submit">
                Search
              </b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header-nav',

  data () {
    return {
      query: ''
    }
  },

  methods: {
    searchPlayers () {
      this.$router.push({
        name: 'players-index',
        params: { search: this.query }
      })
    }
  }
}
</script>

<style>

</style>
