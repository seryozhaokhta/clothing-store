<!-- src/components/FilterPanel.vue -->

<template>
    <aside class="filter-panel">
        <h2>{{ $t('filters') }}</h2>
        <div class="filter-section">
            <h3>{{ $t('categories') }}</h3>
            <ul>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="new-arrivals" /> {{
                        $t('newArrivals') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="home-wear" /> {{
                        $t('homeWear') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="underwear" /> {{
                        $t('underwear') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="swimwear" /> {{
                        $t('swimwear') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="socks-and-accessories" /> {{
                    $t('socksAndAccessories') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="erotic-lingerie" /> {{
                    $t('eroticLingerie') }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="for-men" /> {{ $t('forMen')
                        }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="for-kids" /> {{ $t('forKids')
                        }}</label></li>
                <li><label><input type="checkbox" v-model="localFilters.categories" value="sale" /> {{ $t('sale')
                        }}</label></li>
            </ul>
        </div>
        <div class="filter-section">
            <h3>{{ $t('price') }}</h3>
            <label>
                {{ $t('from') }} <input type="number" v-model.number="localFilters.priceMin" />
            </label>
            <label>
                {{ $t('to') }} <input type="number" v-model.number="localFilters.priceMax" />
            </label>
        </div>
        <div class="filter-section">
            <h3>{{ $t('brand') }}</h3>
            <input type="text" v-model="localFilters.brand" />
        </div>
        <button @click="applyLocalFilters">{{ $t('applyFilters') }}</button>
    </aside>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(['applyFilters']);

const localFilters = ref({ ...props.filters });

watch(props.filters, (newFilters) => {
    localFilters.value = { ...newFilters };
});

function applyLocalFilters() {
    emits('applyFilters', localFilters.value);
}
</script>

<style scoped>
.filter-panel {
    width: 250px;
    padding: 20px;
    border-right: 1px solid #ddd;
}
</style>
