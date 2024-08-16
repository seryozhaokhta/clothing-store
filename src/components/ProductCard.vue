<!-- src/components/ProductCard.vue -->

<template>
    <div class="product-card">
        <div class="product-images">
            <swiper :slides-per-view="1" :loop="true" @slideChange="onSlideChange">
                <swiper-slide v-for="(image, index) in product.images" :key="index">
                    <img :src="image" :alt="`${product.name} ${index + 1}`" />
                </swiper-slide>
            </swiper>
            <!-- Кастомные индикаторы -->
            <div class="custom-pagination">
                <span v-for="(image, index) in product.images" :key="index"
                    :class="{ 'active': currentSlide === index }"></span>
            </div>
        </div>
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['toggleFavorite']);

const isFavorite = ref(props.product.isFavorite);
const currentSlide = ref(0);  // Текущий индекс слайда

const cartStore = useCartStore();

const addToCart = () => {
    cartStore.addToCart(props.product);
};

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;

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

// Обработчик изменения слайда
const onSlideChange = (swiper) => {
    currentSlide.value = swiper.realIndex;  // Обновляем текущий индекс слайда
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

.product-images {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
}

.product-images img {
    max-width: 100%;
    height: auto;
    display: block;
}

.custom-pagination {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.custom-pagination span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: var(--text-color);
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s;
}

.custom-pagination span.active {
    opacity: 1;
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
</style>
