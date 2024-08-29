<!-- src/components/CartWidget.vue -->

<template>
    <div class="cart-widget">
        <div v-if="cartItems.length === 0">
            <p>{{ $t('cartIsEmpty') }}</p>
        </div>
        <div v-else>
            <div class="cart-items">
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <img :src="item.images[0]" :alt="item.name" class="cart-item__image" />
                    <div class="cart-item__details">
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.price }} {{ $t('currency') }}</p>
                        <p>{{ item.quantity }}</p>
                        <button @click="removeFromCart(item.id)">{{ $t('remove') }}</button>
                    </div>
                </div>
            </div>
            <div class="total">
                <h3>{{ $t('totalPrice') }}: {{ totalPrice }} {{ $t('currency') }}</h3>
                <button @click="clearCart">{{ $t('clearCart') }}</button>
                <button class="purchase-button" @click="showPaymentForm = true">{{ $t('finalizePurchase') }}</button>
            </div>
            <div v-if="showPaymentForm" class="payment-form">
                <h3>{{ $t('paymentDetails') }}</h3>
                <form @submit.prevent="processPayment">
                    <div class="form-group">
                        <label for="name">{{ $t('name') }}</label>
                        <input type="text" v-model="customerName" required />
                    </div>
                    <div class="form-group">
                        <label for="address">{{ $t('address') }}</label>
                        <input type="text" v-model="customerAddress" required />
                    </div>
                    <div class="form-group">
                        <label for="card">{{ $t('cardDetails') }}</label>
                        <input type="text" v-model="cardDetails" required />
                    </div>
                    <button type="submit" class="submit-button">{{ $t('payNow') }}</button>
                </form>
            </div>
            <div v-if="showConfirmation" class="order-confirmation">
                <h2>{{ $t('orderConfirmation') }}</h2>
                <p>{{ $t('orderConfirmedMessage') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartItems, totalPrice } = storeToRefs(cartStore);

const showPaymentForm = ref(false);
const showConfirmation = ref(false);
const customerName = ref('');
const customerAddress = ref('');
const cardDetails = ref('');

const removeFromCart = (productId) => {
    cartStore.removeFromCart(productId);
};

const clearCart = () => {
    cartStore.clearCart();
};

const processPayment = () => {
    // Здесь добавляется логика для обработки платежа
    console.log('Обработка платежа...');
    console.log('Имя:', customerName.value);
    console.log('Адрес:', customerAddress.value);
    console.log('Детали карты:', cardDetails.value);

    // Если всё успешно, показываем подтверждение
    showPaymentForm.value = false;
    showConfirmation.value = true;

    // Очищаем корзину после успешного заказа
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
    display: flex;
    border: 1px solid #ddd;
    padding: 10px;
    gap: 15px;
}

.cart-item__image {
    width: 80px;
    height: auto;
    object-fit: cover;
}

.cart-item__details {
    display: flex;
    flex-direction: column;
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

.purchase-button {
    background-color: #4caf50;
    color: white;
    margin-left: 10px;
}

.purchase-button:hover {
    background-color: #45a049;
}

.payment-form {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #4caf50;
    background-color: #e8f5e9;
    color: #2e7d32;
    border-radius: 8px;
}

.payment-form .form-group {
    margin-bottom: 15px;
}

.submit-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #45a049;
}

.order-confirmation {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #4caf50;
    background-color: #e8f5e9;
    color: #2e7d32;
    border-radius: 8px;
}

.order-confirmation h2 {
    margin: 0;
    margin-bottom: 10px;
}

.order-confirmation p {
    margin: 0;
    margin-bottom: 15px;
}
</style>
