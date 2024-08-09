<!-- src/pages/CartPage.vue -->

<template>
    <div>
        <h1>{{ $t('cart') }}</h1>
        <CartWidget />
    </div>
</template>

<script setup>
import CartWidget from '@/components/CartWidget.vue';
</script>
