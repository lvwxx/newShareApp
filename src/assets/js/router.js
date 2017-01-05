import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../../App'
import Report from '../../components/Report'
import Chat from '../../components/chat'
import Detail from '../../components/detail'
import Draft from '../../components/draft'
import Close from '../../components/close'
Vue.use(VueRouter)
const router = new VueRouter({

  routes:[
    {
      path:'/',
      component:App,
      children:[
        {
          path:'/index/SceneId=:id',
          component:Report,
        },
        {
          path:'/chat/SceneId=:id',
          component:Chat,
        }
      ]
    },
    {
      path:'/detail/reportId=:reportId',
      component:Detail,
    },
    {
      path:'/close',
      component:Close,
    },
    {
      path:'/draft/SceneId=:id',
      component:Draft,
    },
    // {
    //   path:'*',
    //   redirect:'/'
    // }
  ],

})
export default router
