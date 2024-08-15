<!-- src/components/FilterPanel.vue -->

<template>
    <aside class="filter-panel">
        <h2>{{ $t('filters') }}</h2>
        <div class="filter-section">
            <h3>{{ $t('brands') }}</h3>
            <ul>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Kris line" /> Kris line</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Subtille" /> Subtille</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Esotiq" /> Esotiq</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Gorsenia" /> Gorsenia</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Kinga" /> Kinga</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Ysabel Mora" /> Ysabel Mora</label></li>
                <li><label><input type="checkbox" v-model="localFilters.brands" @change="applyLocalFilters"
                            value="Jolidon" /> Jolidon</label></li>
            </ul>
        </div>
        <div class="filter-section">
            <h3>{{ $t('price') }}</h3>
            <Slider v-model="localFilters.priceRange" :min="0" :max="maxPrice" :tooltip="'always'" />
        </div>
        <div class="filter-section">
            <h3>{{ $t('size') }}</h3>
            <ul>
                <li v-for="size in availableSizes" :key="size"><label><input type="checkbox"
                            v-model="localFilters.sizes" @change="applyLocalFilters" :value="size" /> {{ size }}</label>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import '@vueform/slider/themes/default.css';
import Slider from '@vueform/slider';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    currentCategory: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['applyFilters']);

const localFilters = ref({ ...props.filters, priceRange: [0, props.maxPrice] });

const sizesByCategory = {
    'home-wear': ['S', 'M', 'L', 'XL'],
    'underwear': ['34', '36', '38', '40', '42'],
    'swimwear': ['S', 'M', 'L', 'XL'],
    'socks-and-accessories': ['One Size'],
    'erotic-lingerie': ['S', 'M', 'L'],
    'for-men': ['M', 'L', 'XL', 'XXL'],
};

const availableSizes = computed(() => sizesByCategory[props.currentCategory] || []);

watch(props.filters, (newFilters) => {
    localFilters.value = { ...newFilters, priceRange: [0, props.maxPrice] };
});

function applyLocalFilters() {
    emits('applyFilters', localFilters.value);
}

watch(localFilters, applyLocalFilters, { deep: true });
</script>

<style scoped>
.filter-panel {
    width: 250px;
    padding: 20px;
    border-right: 1px solid #ddd;
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

.filter-section ul {
    padding-left: 0;
    list-style-type: none;
}

.filter-section h3 {
    margin-bottom: 10px;
}

/* Responsive Styles */
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
        /* Ensure that the items wrap within the panel */
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

