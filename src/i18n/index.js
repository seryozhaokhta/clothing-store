// src/i18n/index.js

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Gabriel store',
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    checkout: 'Checkout',
    contact: 'Contact',
    about: 'About',
    product: 'Product'
  },
  ru: {
    welcome: 'Магазин Габриель',
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
  locale: 'en',
  fallbackLocale: 'ru',
  messages
})

export default i18n
