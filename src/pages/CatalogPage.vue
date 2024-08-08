<!-- src/pages/CatalogPage.vue -->

<template>
    <div class="catalog-container">
        <CategoryFilter @filterCategory="applyCategoryFilter" />
        <SearchBar />
        <FilterPanel :filters="filters" @applyFilters="applyFilters" />
        <main class="catalog-content">
            <h1>{{ $t('catalog') }}</h1>
            <div class="product-grid">
                <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"
                    @addToCart="addToCart" @toggleFavorite="toggleFavorite" />
            </div>
            <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage"
                @nextPage="nextPage" />
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilterPanel from '@/components/FilterPanel.vue';
import ProductCard from '@/components/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import SearchBar from '@/components/SearchBar.vue';

const products = ref([
    { id: 1, name: 'Товар 1', price: 100, isFavorite: false, category: 'new-arrivals', tags: ['newArrivals', 'popular'], brand: 'BrandA' },
    { id: 2, name: 'Товар 2', price: 200, isFavorite: false, category: 'sale', tags: ['sale', 'newArrivals'], brand: 'BrandB' },
    // Остальные товары
]);

const filters = ref({
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    brand: '',
});

const currentPage = ref(1);
const itemsPerPage = 10;

const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const matchesCategory = filters.value.categories.length ? filters.value.categories.includes(product.category) : true;
        const matchesPrice = product.price >= filters.value.priceMin && product.price <= filters.value.priceMax;
        const matchesBrand = filters.value.brand ? product.brand.includes(filters.value.brand) : true;
        return matchesCategory && matchesPrice && matchesBrand;
    });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
});

function applyFilters(newFilters) {
    filters.value = newFilters;
    currentPage.value = 1;
}

function applyCategoryFilter(category) {
    filters.value.categories = [category];
    currentPage.value = 1;
}

function addToCart(product) {
    console.log('Add to cart:', product);
}

function toggleFavorite(product) {
    product.isFavorite = !product.isFavorite;
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}
</script>

<style scoped>
.catalog-container {
    display: flex;
    flex-direction: column;
}

.catalog-content {
    flex: 1;
    padding: 20px;
}

.product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
