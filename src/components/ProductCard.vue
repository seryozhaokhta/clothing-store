<!-- src/components/ProductCard.vue -->

<template>
    <div class="product-card">
        <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }} {{ $t('currency') }}</p>
            <div class="tags">
                <span v-for="tag in product.tags" :key="tag" class="tag">{{ $t(tag) }}</span>
            </div>
        </div>
        <div class="product-actions">
            <button @click="$emit('addToCart', product)">{{ $t('addToCart') }}</button>
            <button @click="$emit('toggleFavorite', product)">
                <span :class="{ 'favorite': product.isFavorite }">❤</span>
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.product-card {
    width: calc(33.333% - 20px);
    border: 1px solid #ddd;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    background-color: #f0f0f0;
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 12px;
}
</style>
