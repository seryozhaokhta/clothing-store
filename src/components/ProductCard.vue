<!-- src/components/ProductCard.vue -->

<template>
    <div class="product-card">
        <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }} {{ $t('currency') }}</p>
            <div class="tags">
                <span v-for="tag in product.tags" :key="tag" class="tag">{{ $t(tag) }}</span>
                <span class="tag">{{ product.brand }}</span>
                <span v-for="size in product.sizes" :key="size" class="tag">{{ size }}</span>
            </div>
        </div>
        <div class="product-actions">
            <button @click="addToCart">{{ $t('addToCart') }}</button>
            <button @click="toggleFavorite">
                <span :class="{ 'favorite': isFavorite }">❤</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['toggleFavorite']);

// Локальная переменная для отслеживания состояния избранного
const isFavorite = ref(props.product.isFavorite);

const cartStore = useCartStore();

const addToCart = () => {
    cartStore.addToCart(props.product);
};

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;

    // Избранные товары в `localStorage`
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    if (isFavorite.value) {
        favoriteProducts.push(props.product);
    } else {
        const index = favoriteProducts.findIndex((item) => item.id === props.product.id);
        if (index > -1) {
            favoriteProducts.splice(index, 1);
        }
    }
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    emit('toggleFavorite', props.product.id);
};
</script>

<style scoped>
.product-card {
    width: calc(33.333% - 20px);
    border: 1px solid #ddd;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--background-color);
    color: var(--text-color);
}

.product-info {
    margin-bottom: 10px;
}

.product-actions {
    display: flex;
    justify-content: space-between;
}

.favorite {
    color: red;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tag {
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 12px;
}

/* Dark Mode Styles */
.product-card {
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
