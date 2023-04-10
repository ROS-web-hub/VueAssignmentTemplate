import { createRouter, createWebHistory } from 'vue-router'
import ClientDashboard from '../views/ClientDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'ClientDashboard',
    component: ClientDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
