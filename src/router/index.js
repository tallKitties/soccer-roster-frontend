import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import Router from 'vue-router'
import PlayersIndex from '@/components/Players/Index'
import PlayersEdit from '@/components/Players/Edit'
import PlayersNew from '@/components/Players/New'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'players-index',
      component: PlayersIndex,
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
