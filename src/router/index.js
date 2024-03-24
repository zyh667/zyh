import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component:()=>import('@/views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component:()=>import('@/views/home.vue'),
    children:[
        {
        path: 'menjin',
          name:'menjin',
        component:()=>import('@/components/home/menjin.vue'),
      },
      {
        path: 'suse',
        name:'suse',
        component:()=>import('@/components/home/suse.vue'),
      },
      {
        path: 'jiaofei',
        name:'jiaofei',
        component:()=>import('@/components/home/jiaofei.vue'),
      }
    ]
  },
  {
    path: '/change_face',
    name: 'change_face',
    component:()=>import('@/views/change_face.vue')
  },
  {
    path: '/dormitory_information',
    name: 'dormitory_information',
    component:()=>import('@/views/dormitory_information.vue')
  },
  {
    path: '/register',
    name: 'register',
    component:()=>import('@/views/register.vue')
  },
  {
    path: '/water_rate',
    name: 'water_rate',
    component:()=>import('@/views/water_rate.vue')
  },
    {
    path: '/repair',
    name: 'repair',
    component:()=>import('@/views/repair.vue')
  },
     {
    path: '/electric_rate',
    name: 'electric_rate',
    component:()=>import('@/views/electric_rate.vue')
  },
  {
    path: '/water_electric_fees',
    name: 'water_electric_fees',
    component:()=>import('@/views/water_electric_fees.vue')
  },
   {
    path: '/tuition',
    name: 'tuition',
    component:()=>import('@/views/tuition.vue')
  },
    {
    path: '/my_panel',
    name: 'my_panel',
    component:()=>import('@/views/my_panel.vue')
  },
    {
    path: '/personal',
    name: 'personal',
    component:()=>import('@/views/personal.vue')
  },
    {
    path: '/record',
    name: 'record',
    component:()=>import('@/views/record.vue')
  },
    {
    path: '/modify_phone',
    name: 'modify_phone',
    component:()=>import('@/views/modify_phone.vue')
  },
    {
    path: '/modify_pwd',
    name: 'modify_pwd',
    component:()=>import('@/views/modify_pwd.vue')
  },
    {
    path: '/forget_information',
    name: 'forget_information',
    component:()=>import('@/views/forget_information.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
