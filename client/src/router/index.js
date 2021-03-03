import Vue from 'vue';
import Router from  'vue-router'

Vue.use(Router);
const routes=[
    {
        path:'/',
        redirect:'/home',
    },
    {
        path:'/home',
        component:()=>import('../view/home/Home')
    },
    {
        path:'/pay',
        component:()=>import('../view/pay/Pay')
    },

]

export default new Router({
    routes,
    mode:'history',
    // linkActiveClass: 'heaven',   //把router-link-active的名字修改成执行的名字
})