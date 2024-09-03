<!-- src\components\FilterPanel.vue -->

<template>
    <aside class="filter-panel">
        <h2>{{ $t('filters') }}</h2>
        <div class="filter-section">
            <h3>{{ $t('brands') }}</h3>
            <div class="button-list">
                <button v-for="brand in availableBrands" :key="brand"
                    :class="{ 'active': localFilters.brands.includes(brand) }" @click="toggleBrand(brand)">
                    {{ brand }}
                </button>
            </div>
        </div>
        <div class="filter-section">
            <h3>{{ $t('price') }}</h3>
            <Slider v-model="localFilters.priceRange" :min="0" :max="maxPrice" :tooltip="'always'" />
        </div>
        <div class="filter-section" v-if="availableColors.length">
            <h3>{{ $t('colors') }}</h3>
            <div class="color-palette">
                <button v-for="color in availableColors" :key="color"
                    :class="{ 'active': localFilters.colors.includes(color) }" @click="toggleColor(color)"
                    :style="{ backgroundColor: color }"></button>
            </div>
        </div>
        <div class="filter-section">
            <h3>{{ $t('size') }}</h3>
            <div class="button-list">
                <button v-for="size in availableSizes" :key="size"
                    :class="{ 'active': localFilters.sizes.includes(size) }" @click="toggleSize(size)">
                    {{ size }}
                </button>
            </div>
        </div>
        <button class="reset-filters-button" @click="resetFilters">{{ $t('resetFilter') }}</button>
    </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import '@vueform/slider/themes/default.css';
import Slider from '@vueform/slider';
import { products } from '@/data/products';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['applyFilters', 'resetFilters']);

const localFilters = ref({ ...props.filters });

const availableBrands = computed(() => [...new Set(Object.values(products).flat().map(product => product.brand))]);

const sizesByBrand = {
    'Kris line': ['S', 'M', 'L', 'XL'],
    'Subtille': ['S', 'M', 'L', 'XL'],
    'Esotiq': ['S', 'M', 'L', 'XL'],
    'Gorsenia': ['S', 'M', 'L', 'XL'],
    'Kinga': ['S', 'M', 'L', 'XL'],
    'Ysabel Mora': ['S', 'M', 'L', 'XL'],
    'Jolidon': ['S', 'M', 'L', 'XL'],
    'Melle': ['S', 'M', 'L', 'XL'],
    'Julimex': ['S', 'M', 'L', 'XL'],
    'Novika': ['S', 'M', 'L', 'XL']
};

const colorsByBrand = {
    'Kris line': ['black', 'white'],
    'Subtille': ['blue', 'red'],
    'Esotiq': ['pink', 'beige', 'emerald'],
    'Gorsenia': ['black', 'gray'],
    'Kinga': ['white', 'beige'],
    'Ysabel Mora': ['black'],
    'Jolidon': ['red', 'black'],
    'Melle': ['black', 'powder', 'milky', 'jeans', 'green'],
    'Julimex': ['nude', 'black'],
    'Novika': ['black', 'red', 'purple']
};

const availableSizes = computed(() => {
    const selectedBrands = localFilters.value.brands || [];
    let sizes = [];

    selectedBrands.forEach(brand => {
        sizes = sizes.concat(sizesByBrand[brand] || []);
    });

    return [...new Set(sizes)];
});

const availableColors = computed(() => {
    const selectedBrands = localFilters.value.brands || [];
    let colors = [];

    selectedBrands.forEach(brand => {
        colors = colors.concat(colorsByBrand[brand] || []);
    });

    return [...new Set(colors)];
});

function toggleBrand(brand) {
    const index = localFilters.value.brands.indexOf(brand);
    if (index > -1) {
        localFilters.value.brands.splice(index, 1);
    } else {
        localFilters.value.brands.push(brand);
    }
}

function toggleColor(color) {
    const index = localFilters.value.colors.indexOf(color);
    if (index > -1) {
        localFilters.value.colors.splice(index, 1);
    } else {
        localFilters.value.colors.push(color);
    }
}

function toggleSize(size) {
    const index = localFilters.value.sizes.indexOf(size);
    if (index > -1) {
        localFilters.value.sizes.splice(index, 1);
    } else {
        localFilters.value.sizes.push(size);
    }
}

function resetFilters() {
    localFilters.value = {
        brands: [],
        priceRange: [0, props.maxPrice],
        colors: [],
        sizes: []
    };
    emits('resetFilters');
}

watch(localFilters, () => {
    emits('applyFilters', localFilters.value);
}, { deep: true });
</script>

<style scoped>
.filter-panel {
    width: 250px;
    padding: 20px;
    border-right: 1px solid #ddd;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-family);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.reset-filters-button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #ff4081;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    width: 100%;
    transition: background-color 0.3s ease;
}

.reset-filters-button:hover {
    background-color: #e73370;
}

.filter-section {
    margin-bottom: 20px;
}

.filter-section h3 {
    margin-bottom: 10px;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-medium);
}

.button-list,
.color-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.button-list button,
.color-palette button {
    padding: 8px 12px;
    background-color: var(--highlight-background);
    border-radius: 16px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.button-list button.active,
.color-palette button.active {
    background-color: #ff4081;
    color: #fff;
    border-color: #ff4081;
}

.color-palette button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 0;
}

.color-palette button.active {
    border-color: #ff4081;
}

/* Стили для слайдера */
:deep(.slider-tooltip) {
    --slider-track-bg: #ff4081;
    --slider-thumb-bg: #ff4081;
    --slider-thumb-border: #ff4081;
    --slider-tooltip-bg: #ff4081;
    --slider-tooltip-color: #fff;
}

:deep(.slider-connect) {
    background-color: #ff4081;
}

:deep(.slider-thumb),
:deep(.slider-thumb-lower),
:deep(.slider-thumb-upper),
:deep(.slider-thumb-active) {
    box-shadow: none !important;
    border: 2px solid #ff4081 !important;
}

:deep(.slider-thumb:hover),
:deep(.slider-thumb:focus),
:deep(.slider-thumb-lower:hover),
:deep(.slider-thumb-lower:focus),
:deep(.slider-thumb-upper:hover),
:deep(.slider-thumb-upper:focus) {
    box-shadow: 0 0 5px #ff4081 !important;
}

/* Адаптивные стили */
@media (max-width: 768px) {
    .filter-panel {
        width: 100%;
        padding: 15px;
        margin-bottom: 20px;
        border-right: none;
        border-bottom: 1px solid #ddd;
    }

    .button-list,
    .color-palette {
        flex-direction: column;
        gap: 10px;
    }
}
</style>
