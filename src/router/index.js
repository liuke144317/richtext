import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import newsBulletin from '@/components/newsBulletin/newsBulletin'
import newsBulletinDetail from '@/components/newsBulletinDetail/newsBulletinDetail'
import publication_add from '@/components/newsBulletinPublication/publication_add/publication_add'

Vue.use(Router)

export default new Router({
  routes: [
    {

      path: '/',
      redirect:'/newsBulletin',
      name: '主页'
    },
    {
      /* 新闻公告展示*/
      path: '/newsBulletin',
      name: 'newsBulletin',
      component: newsBulletin
    },
    {
      /* 新闻公告详情*/
      path: '/newsBulletinDetail',
      name: 'newsBulletinDetail',
      component: newsBulletinDetail
    },
    {
      /* 新闻公告发布-添加新闻*/
      path: '/publication_add',
      name: 'publication_add',
      component: publication_add
    }
  ]
})
