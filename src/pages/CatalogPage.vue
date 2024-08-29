<!-- src/pages/CatalogPage.vue -->

<template>
    <h1 class="catalog__title">{{ $t('catalog') }}</h1>
    <div class="catalog__container">
        <CategoryFilter @filterCategory="applyCategoryFilter" @filterSubcategory="applySubcategoryFilter"
            @resetCategoryFilter="resetFilters" />
        <SearchBar @performSearch="performSearch" />
        <div class="catalog__main">
            <FilterPanel :filters="filters" :maxPrice="maxPrice" :currentCategory="currentCategory"
                @applyFilters="applyFilters" @resetFilters="resetFilters" />
            <main class="catalog__content">
                <div class="catalog__product-grid">
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { useCartStore } from '@/stores/cart';
import { products } from '@/data/products';
import FilterPanel from '@/components/FilterPanel.vue';
import ProductCard from '@/components/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import SearchBar from '@/components/SearchBar.vue';
import gsap from 'gsap';

const productsRef = ref(Object.values(products).flat());

const filters = ref({
    categories: [],
    subcategories: [],
    brands: [],
    priceRange: [0, Math.max(...productsRef.value.map(p => p.price))],
    sizes: [],
    colors: [],
    searchQuery: ''
});

const maxPrice = ref(Math.max(...productsRef.value.map(p => p.price)));

const currentCategory = ref('');
const currentSubcategory = ref('');

const currentPage = ref(1);
const itemsPerPage = 10;

const filteredProducts = computed(() => {
    return productsRef.value.filter((product) => {
        const matchesCategory = filters.value.categories.length > 0
            ? filters.value.categories.includes(product.category)
            : true;
        const matchesSubcategory = filters.value.subcategories.length > 0
            ? filters.value.subcategories.includes(product.subcategory)
            : true;
        const matchesPrice = product.price >= filters.value.priceRange[0] && product.price <= filters.value.priceRange[1];
        const matchesBrand = filters.value.brands.length > 0 ? filters.value.brands.includes(product.brand) : true;
        const matchesSize = filters.value.sizes.length > 0 ? filters.value.sizes.some(size => product.sizes.includes(size)) : true;
        const matchesColor = filters.value.colors.length > 0
            ? product.colors && filters.value.colors.some(color => product.colors.includes(color))
            : true;
        const matchesQuery = filters.value.searchQuery
            ? product.name.toLowerCase().includes(filters.value.searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(filters.value.searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSubcategory && matchesPrice && matchesBrand && matchesSize && matchesColor && matchesQuery;
    });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
});

const animateProductCards = async () => {
    await nextTick(); // Ожидаем рендеринг DOM элементов
    gsap.fromTo('.product-card', { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out',
    });
};

function applyFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1;
    animateProductCards(); // Запускаем анимацию при изменении фильтров
}

function applyCategoryFilter({ category }) {
    filters.value.categories = [category];
    filters.value.subcategories = [];
    applyFilters({ categories: [category], subcategories: [] });
    currentCategory.value = category;
    currentSubcategory.value = '';
}

function applySubcategoryFilter({ category, subcategory }) {
    filters.value.categories = [category];
    filters.value.subcategories = [subcategory];
    applyFilters({ categories: [category], subcategories: [subcategory] });
    currentCategory.value = category;
    currentSubcategory.value = subcategory;
}

function performSearch(query) {
    filters.value.searchQuery = query;
    currentPage.value = 1;
    animateProductCards(); // Запускаем анимацию при поиске
}

function resetFilters() {
    filters.value = {
        categories: [],
        subcategories: [],
        brands: [],
        priceRange: [0, maxPrice.value],
        sizes: [],
        colors: [],
        searchQuery: ''
    };
    currentPage.value = 1;
    currentCategory.value = '';
    currentSubcategory.value = '';
    animateProductCards(); // Запускаем анимацию при сбросе фильтров
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
        animateProductCards(); // Запускаем анимацию при смене страницы
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        animateProductCards(); // Запускаем анимацию при смене страницы
    }
}

// Запускаем анимацию при первом монтировании компонента
onMounted(() => {
    animateProductCards();
});
</script>

<style scoped>
.catalog__title {
    text-align: center;
    font-size: var(--font-size-large);
    margin-top: 50px;
    margin-bottom: 20px;
}

.catalog__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.catalog__main {
    display: flex;
    flex-direction: row;
}

.catalog__content {
    flex: 1;
    padding: 20px;
}

.catalog__product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .catalog__main {
        flex-direction: column;
    }

    .catalog__filter-panel {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #ddd;
    }

    .catalog__product-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .product-card {
        max-width: 170px;
        box-sizing: border-box;
    }

    .catalog__search-bar-input {
        width: 100%;
    }

    .catalog__search-bar {
        flex-direction: column;
    }
}

/* Dark Mode Styles */
.catalog__container {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}

.catalog__content {
    background-color: var(--background-color);
    color: var(--text-color);
}

.catalog__filter-panel {
    background-color: var(--background-color);
    color: var(--text-color);
}

.catalog__category-filter {
    background-color: var(--background-color);
    color: var(--text-color);
}

.catalog__pagination {
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
