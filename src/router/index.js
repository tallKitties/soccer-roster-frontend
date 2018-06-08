import Vue from 'vue'
import Router from 'vue-router'
import PlayersList from '@/components/Players/List'
import PlayersShow from '@/components/Players/Show'
import PlayersNew from '@/components/Players/New'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'players-list',
      component: PlayersList,
      alias: '/players'
    },
    {
      path: '/players/:id',
      name: 'players-show',
      component: PlayersShow,
      props: true
    },
    {
      path: '/players/new',
      name: 'players-new',
      component: PlayersNew
    }
  ]
})
