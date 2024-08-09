<!-- src/components/CartWidget.vue -->

<template>
    <div class="cart-widget">
        <div v-if="cartItems.length === 0">
            <p>{{ $t('cartIsEmpty') }}</p>
        </div>
        <div v-else>
            <div class="cart-items">
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.price }} {{ $t('currency') }}</p>
                    <p>{{ item.quantity }}</p>
                    <button @click="removeFromCart(item.id)">{{ $t('remove') }}</button>
                </div>
            </div>
            <div class="total">
                <h3>{{ $t('totalPrice') }}: {{ totalPrice }} {{ $t('currency') }}</h3>
                <button @click="clearCart">{{ $t('clearCart') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartItems, totalPrice } = storeToRefs(cartStore);

const removeFromCart = (productId) => {
    console.log('Removing product from cart:', productId);
    cartStore.removeFromCart(productId);
};

const clearCart = () => {
    console.log('Clearing cart');
    cartStore.clearCart();
};
</script>

<style scoped>
.cart-widget {
    border: 1px solid #ddd;
    padding: 10px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cart-item {
    border: 1px solid #ddd;
    padding: 10px;
}

button {
    margin-top: 10px;
    padding: 10px;
    background-color: var(--button-background);
    color: var(--button-text);
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: var(--button-hover-background);
}

.total {
    margin-top: 20px;
}

.total h3 {
    margin: 0;
}

/* Dark Mode Styles */
.cart-widget {
    background-color: var(--background-color);
    color: var(--text-color);
}

button {
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
