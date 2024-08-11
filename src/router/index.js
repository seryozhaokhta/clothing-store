// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import CartPage from '../pages/CartPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/register', name: 'Register', component: RegisterForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
