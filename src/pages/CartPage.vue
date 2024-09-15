<!-- src/pages/CartPage.vue -->

<template>
    <div class="cart-page">
        <h1 class="cart-page__title">{{ $t('cart') }}</h1>
        <CartWidget />
    </div>
</template>

<script setup>
import CartWidget from '@/components/CartWidget.vue';
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
    gsap.from('.cart-page__title', {
        opacity: 0,
        y: 20,  // Появление снизу вверх
        duration: 1,
        ease: 'power2.out',
    });

    gsap.from('.cart-widget', {
        opacity: 0,
        y: 20,  // Появление снизу вверх для консистентности
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,
    });
});
</script>

<style scoped>
.cart-page {
    padding: 20px;
    background-color: var(--background-color);
}

.cart-page__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--text-color);
    text-align: center;
    /* Выровняли заголовок по центру */
    margin-top: 40px;
    /* Добавили отступ сверху для соответствия с другими страницами */
    margin-bottom: 40px;
    /* Отступ снизу для совпадения с другими страницами */
}
</style>


