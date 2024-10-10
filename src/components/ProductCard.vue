<!-- src/components/ProductCard.vue -->

<template>
    <div class="product-card">
        <SkeletonLoader v-if="isLoading" />

        <div v-else>
            <div class="product-card__images">
                <swiper :slides-per-view="1" :loop="product.images.length > 1" @slideChange="onSlideChange">
                    <swiper-slide v-for="(image, index) in product.images" :key="index">
                        <div class="product-card__images-wrapper">
                            <img :src="image" :alt="`${product.name} ${index + 1}`" @load="onImageLoad()"
                                loading="lazy" />
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="product-card__pagination">
                    <span v-for="(image, index) in product.images" :key="index"
                        :class="{ 'product-card__pagination-item--active': currentSlide === index }"
                        class="product-card__pagination-item"></span>
                </div>
            </div>
            <div class="product-card__info">
                <h3 class="product-card__info-title">{{ product.name }}</h3>
                <p class="product-card__info-price">{{ product.price }} {{ $t('currency') }}</p>
                <div class="product-card__tags">
                    <span v-for="tag in product.tags" :key="tag" class="product-card__tag">{{ $t(tag) }}</span>
                    <span class="product-card__tag">{{ product.brand }}</span>
                    <span v-for="size in product.sizes" :key="size" class="product-card__tag">{{ size }}</span>
                </div>
                <div class="product-card__colors">
                    <span v-for="color in product.colors" :key="color" :style="{ backgroundColor: getColor(color) }"
                        class="product-card__color-circle"></span>
                </div>
            </div>
            <div class="product-card__actions">
                <button class="product-card__actions-button" @click="addToCart">{{ $t('addToCart') }}</button>
                <button class="product-card__actions-button" @click="toggleFavorite">
                    <span :class="{ 'product-card__actions-favorite--active': isFavorite }"
                        class="product-card__actions-favorite">❤</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['toggleFavorite']);

const isFavorite = ref(props.product.isFavorite);
const currentSlide = ref(0);
const isLoading = ref(true);

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

const onSlideChange = (swiper) => {
    currentSlide.value = swiper.realIndex;
};

const onImageLoad = () => {
    isLoading.value = false;
};

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 700);
});

// Map of color names to valid CSS colors
const colorMap = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    nude: '#FAD6A5',
    pink: '#FFC0CB',
    beige: '#F5F5DC',
    emerald: '#50C878',
    powder: '#F0E0D6',
    milky: '#FFFDD0',
    jeans: '#5DADEC',
    graphite: '#383838',
    'pink pearl': '#E7ACCF',
    flesh: '#FFE4C4',
    gray: '#808080',
    purple: '#800080',
    // Add more mappings as needed
};

function getColor(colorName) {
    return colorMap[colorName.toLowerCase()] || 'transparent';
}
</script>

<style scoped>
.product-card {
    width: 100%;
    max-width: 350px;
    max-height: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin: 0 auto;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.product-card__images {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background-color: var(--skeleton-background);
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-card__images img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-card__images img {
    transform: scale(1.05);
}

.product-card__pagination {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    gap: 5px;
    z-index: 10;
}

.product-card__pagination-item {
    width: 8px;
    height: 8px;
    background-color: var(--text-color-secondary);
    border-radius: 50%;
    opacity: 0.6;
    transition: opacity 0.3s, background-color 0.3s;
    cursor: pointer;
}

.product-card__pagination-item--active {
    opacity: 1;
    background-color: var(--highlight-background);
}

.product-card__info {
    margin-top: 15px;
}

.product-card__info-title {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-bold);
    margin-bottom: 5px;
    color: var(--text-color);
}

.product-card__info-price {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    color: var(--text-color-secondary);
    margin-bottom: 10px;
}

.product-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
}

.product-card__tag {
    background-color: var(--highlight-background);
    color: var(--text-color);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: var(--font-weight-normal);
}

.product-card__colors {
    display: flex;
    gap: 5px;
}

.product-card__color-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid var(--text-color-secondary);
}

.product-card__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.product-card__actions-button {
    background-color: var(--highlight-background);
    color: var(--text-color);
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.product-card__actions-button:hover {
    background-color: var(--text-color);
    color: var(--background-color);
}

.product-card__actions-favorite {
    font-size: 20px;
    transition: color 0.3s ease;
}

.product-card__actions-favorite--active {
    color: red;
}
</style>
