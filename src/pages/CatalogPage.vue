<!-- src/pages/CatalogPage.vue -->

<template>
    <h1>{{ $t('catalog') }}</h1>
    <div class="catalog-container">
        <CategoryFilter @filterCategory="applyCategoryFilter" @resetCategoryFilter="resetCategoryFilter" />
        <SearchBar />
        <div class="catalog-main">
            <FilterPanel :filters="filters" :maxPrice="maxPrice" :currentCategory="currentCategory"
                @applyFilters="applyFilters" />
            <main class="catalog-content">
                <div class="product-grid">
                    <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"
                        @addToCart="addToCart" @toggleFavorite="toggleFavorite" />
                </div>
                <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage"
                    @nextPage="nextPage" />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { products } from '@/data/products';
import FilterPanel from '@/components/FilterPanel.vue';
import ProductCard from '@/components/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import SearchBar from '@/components/SearchBar.vue';

const productsRef = ref(products);

const filters = ref({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    sizes: [],
    colors: [] // добавляем поле для фильтрации по цветам
});

const currentCategory = ref('');

const maxPrice = ref(Math.max(...productsRef.value.map((p) => p.price)));

const currentPage = ref(1);
const itemsPerPage = 10;

const filteredProducts = computed(() => {
    return productsRef.value.filter((product) => {
        const matchesCategory = filters.value.categories.length
            ? filters.value.categories.includes(product.category)
            : true;
        const matchesPrice = product.price >= filters.value.priceRange[0] && product.price <= filters.value.priceRange[1];
        const matchesBrand = filters.value.brands.length ? filters.value.brands.includes(product.brand) : true;
        const matchesSize = filters.value.sizes.length ? filters.value.sizes.some(size => product.sizes.includes(size)) : true;
        const matchesColor = filters.value.colors.length
            ? product.colors && filters.value.colors.some(color => product.colors.includes(color))
            : true; // Убедитесь, что проверяется наличие цветов у продукта
        return matchesCategory && matchesPrice && matchesBrand && matchesSize && matchesColor;
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
    currentCategory.value = category;
    currentPage.value = 1;
}

function resetCategoryFilter() {
    filters.value.categories = [];
    currentCategory.value = '';
    currentPage.value = 1;
}

const cartStore = useCartStore();

function addToCart(product) {
    cartStore.addToCart(product);
    alert('Товар добавлен в корзину!');
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
    gap: 10px;
}

.catalog-main {
    display: flex;
    flex-direction: row;
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

/* Responsive Styles */
@media (max-width: 768px) {
    .catalog-main {
        flex-direction: column;
    }

    .filter-panel {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #ddd;
    }

    .product-card {
        width: 100%;
    }

    .product-grid {
        flex-direction: column;
    }

    .search-bar input {
        width: 100%;
    }

    .search-bar {
        flex-direction: column;
    }
}

/* Dark Mode Styles */
.catalog-container {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}

.catalog-content {
    background-color: var(--background-color);
    color: var(--text-color);
}

.product-card {
    background-color: var(--background-color);
    color: var(--text-color);
}

.filter-panel {
    background-color: var(--background-color);
    color: var(--text-color);
}

.category-filter {
    background-color: var(--background-color);
    color: var(--text-color);
}

.pagination {
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
