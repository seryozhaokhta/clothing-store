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
                <button class="telegram-button" @click="generateInvoice">{{ $t('sendInvoiceToTelegram') }}</button>
            </div>
            <div v-if="showConfirmation" class="order-confirmation">
                <h2>{{ $t('invoiceGenerated') }}</h2>
                <p>{{ $t('contactViaTelegram') }}</p>
                <a :href="telegramLink" target="_blank">{{ $t('openTelegram') }}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'; // Импортируем I18n для поддержки $t

const { t } = useI18n(); // Получаем функцию t для использования в компоненте

const cartStore = useCartStore();
const { cartItems, totalPrice } = storeToRefs(cartStore);

const showConfirmation = ref(false);
const telegramLink = ref('');

const removeFromCart = (productId) => {
    cartStore.removeFromCart(productId);
};

const clearCart = () => {
    cartStore.clearCart();
};

const generateInvoice = () => {
    // Формируем чек в виде строки
    const invoiceDetails = cartItems.value.map(item => `${item.name} x${item.quantity}: ${item.price}`).join('\n');
    const total = `\n${t('totalPrice')}: ${totalPrice.value} ${t('currency')}`;

    // Ссылка на Telegram с чеком
    const message = encodeURIComponent(`Order details:\n${invoiceDetails}\n${total}`);
    telegramLink.value = `https://t.me/your_assistant_bot?text=${message}`;

    // Показываем подтверждение
    showConfirmation.value = true;
};
</script>

<style scoped>
.cart-widget {
    border: 1px solid #ddd;
    padding: 20px;
    /* Добавим больше отступов */
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
    background-color: white;
    border-radius: 8px;
    transition: box-shadow 0.3s;
}

.cart-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item__image {
    width: 80px;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
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
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: var(--button-hover-background);
}

.total {
    margin-top: 20px;
}

.telegram-button {
    background-color: #0088cc;
    color: white;
    margin-left: 10px;
}

.telegram-button:hover {
    background-color: #0077b3;
}

.order-confirmation {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #0088cc;
    background-color: #e0f7fa;
    color: #006064;
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

