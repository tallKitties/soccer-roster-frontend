import Vue from 'vue'
import Router from 'vue-router'
import PlayersList from '@/components/Players/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/players',
      name: 'Players',
      component: PlayersList
    }
  ]
})
