<!-- src\components\FilterPanel.vue -->

<template>
    <aside class="filter-panel">
        <h2>{{ $t('filters') }}</h2>
        <div class="filter-section">
            <h3>{{ $t('brands') }}</h3>
            <ul>
                <li v-for="brand in availableBrands" :key="brand">
                    <label><input type="checkbox" v-model="localFilters.brands" :value="brand" /> {{ brand }}</label>
                </li>
            </ul>
        </div>
        <div class="filter-section">
            <h3>{{ $t('price') }}</h3>
            <Slider v-model="localFilters.priceRange" :min="0" :max="maxPrice" :tooltip="'always'" />
        </div>
        <div class="filter-section" v-if="availableColors.length">
            <h3>{{ $t('colors') }}</h3>
            <ul class="color-palette">
                <li v-for="color in availableColors" :key="color">
                    <label :style="{ backgroundColor: color }">
                        <input type="checkbox" v-model="localFilters.colors" :value="color" />
                    </label>
                </li>
            </ul>
        </div>
        <div class="filter-section">
            <h3>{{ $t('size') }}</h3>
            <ul>
                <li v-for="size in availableSizes" :key="size">
                    <label><input type="checkbox" v-model="localFilters.sizes" :value="size" /> {{ size }}</label>
                </li>
            </ul>
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
    'Kris line': ['S', 'M', 'L'],
    'Subtille': ['M', 'L', 'XL'],
    'Esotiq': ['34', '36', '38'],
    'Gorsenia': ['S', 'M', 'L', 'XL'],
    'Kinga': ['34', '36'],
    'Ysabel Mora': ['One Size'],
    'Jolidon': ['S', 'M', 'L', 'XL'],
    'Melle': ['34', '36', '38', '40', '42'],
    'Julimex': ['S', 'M', 'L', 'XL'],
    'Novika': ['M', 'L', 'XL']
};

const colorsByBrand = {
    'Kris line': ['black', 'white'],
    'Subtille': ['blue', 'red'],
    'Esotiq': ['pink', 'beige'],
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
}

.reset-filters-button:hover {
    background-color: #e73370;
}

.filter-section ul {
    padding-left: 0;
    list-style-type: none;
}

.filter-section h3 {
    margin-bottom: 10px;
}

.color-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-palette li label {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #ccc;
}

.color-palette li label input {
    display: none;
}

.color-palette li label input:checked {
    border-color: #ff4081;
}

/* Dark Mode Styles */
.filter-panel {
    background-color: var(--background-color);
    color: var(--text-color);
}

.filter-panel h2,
.filter-panel h3,
.filter-panel label {
    color: var(--text-color);
}

.reset-filters-button {
    background-color: var(--primary-color);
    color: var(--text-color);
}

.reset-filters-button:hover {
    background-color: var(--primary-color-hover);
}

@media (max-width: 768px) {
    .filter-panel {
        width: 100%;
        padding: 10px;
        border-right: none;
        border-bottom: 1px solid #ddd;
    }

    .filter-section ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .filter-section li {
        width: 100%;
    }

    .filter-section label {
        width: 100%;
        display: block;
    }
}
</style>
