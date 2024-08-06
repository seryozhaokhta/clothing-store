// src/i18n/index.js

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome to Clothing Store',
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    checkout: 'Checkout',
    contact: 'Contact',
    about: 'About',
    product: 'Product'
  },
  ru: {
    welcome: 'Добро пожаловать в Магазин Одежды',
    home: 'Главная',
    catalog: 'Каталог',
    cart: 'Корзина',
    checkout: 'Оформление заказа',
    contact: 'Контакты',
    about: 'О нас',
    product: 'Продукт'
  }
}

const i18n = createI18n({
  locale: 'en', // текущий язык
  fallbackLocale: 'en', // резервный язык
  messages // наши переводы
})

export default i18n
