import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import Router from 'vue-router'
import PlayersList from '@/components/Players/List'
import PlayersEdit from '@/components/Players/Edit'
import PlayersNew from '@/components/Players/New'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'players-list',
      component: PlayersList,
      alias: '/players',
      props: true
    },
    {
      path: '/players/:id',
      name: 'players-edit',
      component: PlayersEdit,
      props: true
    },
    {
      path: '/players/new',
      name: 'players-new',
      component: PlayersNew
    }
  ]
})
