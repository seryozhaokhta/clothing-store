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
            </ul>
        </div>
        <div class="filter-section">
            <h3>{{ $t('price') }}</h3>
            <Slider v-model="localFilters.priceRange" :min="0" :max="maxPrice" :tooltip="'always'" />
        </div>
    </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
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
    }
});

const emits = defineEmits(['applyFilters']);

const localFilters = ref({ ...props.filters, priceRange: [0, props.maxPrice] });

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
</style>
