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
import FilterPanel from '@/components/FilterPanel.vue';
import ProductCard from '@/components/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useCartStore } from '@/stores/cart';


const products = ref([
    { id: 1, name: 'Product 1', price: 100, isFavorite: false, category: 'new-arrivals', sizes: ['S', 'M', 'L'], tags: ['newArrivals', 'popular'], brand: 'Kris line' },
    { id: 2, name: 'Product 2', price: 200, isFavorite: false, category: 'sale', sizes: ['M', 'L', 'XL'], tags: ['sale', 'newArrivals'], brand: 'Subtille' },
    { id: 3, name: 'Product 3', price: 150, isFavorite: false, category: 'underwear', sizes: ['34', '36', '38'], tags: ['popular'], brand: 'Esotiq' },
    { id: 4, name: 'Product 4', price: 180, isFavorite: false, category: 'home-wear', sizes: ['S', 'M'], tags: [], brand: 'Gorsenia' },
    { id: 5, name: 'Product 5', price: 120, isFavorite: false, category: 'swimwear', sizes: ['M', 'L'], tags: [], brand: 'Kinga' },
    { id: 6, name: 'Product 6', price: 220, isFavorite: false, category: 'socks-and-accessories', sizes: ['One Size'], tags: [], brand: 'Ysabel Mora' },
    { id: 7, name: 'Product 7', price: 130, isFavorite: false, category: 'erotic-lingerie', sizes: ['S', 'M', 'L'], tags: [], brand: 'Kris line' },
    { id: 8, name: 'Product 8', price: 240, isFavorite: false, category: 'for-men', sizes: ['M', 'L', 'XL'], tags: ['newArrivals'], brand: 'Subtille' },
    { id: 9, name: 'Product 9', price: 210, isFavorite: false, category: 'new-arrivals', sizes: ['S', 'M'], tags: ['sale'], brand: 'Gorsenia' },
    { id: 10, name: 'Product 10', price: 110, isFavorite: false, category: 'swimwear', sizes: ['M', 'L'], tags: ['sale'], brand: 'Kinga' },
    { id: 11, name: 'Product 11', price: 230, isFavorite: false, category: 'socks-and-accessories', sizes: ['One Size'], tags: ['newArrivals'], brand: 'Ysabel Mora' },
    { id: 12, name: 'Product 12', price: 140, isFavorite: false, category: 'erotic-lingerie', sizes: ['S', 'M'], tags: [], brand: 'Kris line' },
    { id: 13, name: 'Product 13', price: 220, isFavorite: false, category: 'for-men', sizes: ['M', 'L', 'XL'], tags: ['popular'], brand: 'Subtille' },
    { id: 14, name: 'Product 14', price: 170, isFavorite: false, category: 'underwear', sizes: ['34', '36'], tags: ['sale'], brand: 'Esotiq' },
    { id: 15, name: 'Product 15', price: 200, isFavorite: false, category: 'new-arrivals', sizes: ['S', 'M', 'L'], tags: ['newArrivals'], brand: 'Gorsenia' },
    { id: 16, name: 'Product 16', price: 130, isFavorite: false, category: 'underwear', sizes: ['34', '36'], tags: ['popular'], brand: 'Kinga' },
    { id: 17, name: 'Product 17', price: 250, isFavorite: false, category: 'home-wear', sizes: ['S', 'M'], tags: [], brand: 'Ysabel Mora' },
    { id: 18, name: 'Product 18', price: 120, isFavorite: false, category: 'swimwear', sizes: ['M', 'L'], tags: ['sale'], brand: 'Kris line' },
    { id: 19, name: 'Product 19', price: 240, isFavorite: false, category: 'socks-and-accessories', sizes: ['One Size'], tags: [], brand: 'Subtille' },
    { id: 20, name: 'Product 20', price: 150, isFavorite: false, category: 'erotic-lingerie', sizes: ['S', 'M'], tags: ['newArrivals'], brand: 'Esotiq' },
    { id: 21, name: 'Product 21', price: 230, isFavorite: false, category: 'for-men', sizes: ['M', 'L', 'XL'], tags: [], brand: 'Gorsenia' },
    { id: 22, name: 'Product 22', price: 180, isFavorite: false, category: 'new-arrivals', sizes: ['S', 'M', 'L'], tags: ['popular'], brand: 'Ysabel Mora' },
    { id: 23, name: 'Product 23', price: 160, isFavorite: false, category: 'underwear', sizes: ['34', '36'], tags: [], brand: 'Kris line' },
    { id: 24, name: 'Product 24', price: 270, isFavorite: false, category: 'home-wear', sizes: ['S', 'M'], tags: ['newArrivals'], brand: 'Subtille' },
    { id: 25, name: 'Product 25', price: 200, isFavorite: false, category: 'swimwear', sizes: ['M', 'L'], tags: ['sale'], brand: 'Esotiq' },
    { id: 26, name: 'Product 26', price: 260, isFavorite: false, category: 'socks-and-accessories', sizes: ['One Size'], tags: [], brand: 'Gorsenia' },
    { id: 27, name: 'Product 27', price: 150, isFavorite: false, category: 'erotic-lingerie', sizes: ['S', 'M'], tags: ['popular'], brand: 'Kinga' },
    { id: 28, name: 'Product 28', price: 280, isFavorite: false, category: 'for-men', sizes: ['M', 'L', 'XL'], tags: ['newArrivals'], brand: 'Ysabel Mora' },
    { id: 29, name: 'Product 29', price: 220, isFavorite: false, category: 'underwear', sizes: ['34', '36'], tags: ['popular'], brand: 'Jolidon' },
    { id: 30, name: 'Product 30', price: 190, isFavorite: false, category: 'new-arrivals', sizes: ['S', 'M', 'L'], tags: ['sale'], brand: 'Gorsenia' },
    { id: 31, name: 'Product 31', price: 210, isFavorite: false, category: 'swimwear', sizes: ['M', 'L'], tags: ['newArrivals'], brand: 'Subtille' },
    {
        id: 32,
        name: 'Product 32',
        price: 250,
        isFavorite: false,
        category: 'underwear',
        sizes: ['34', '36'],
        tags: ['newArrivals'],
        brand: 'Melle',
        images: [
            '/src/assets/catalog/DALILA-black/ML0611_черн_2.jpg',
            '/src/assets/catalog/DALILA-black/ML0614_черн+ML0601_2.jpg',
            '/src/assets/catalog/DALILA-black/ML0614_черн+ML0601_3.jpg'
        ]
    }
]);

const filters = ref({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    sizes: []
});

const currentCategory = ref('');

const maxPrice = ref(Math.max(...products.value.map((p) => p.price)));

const currentPage = ref(1);
const itemsPerPage = 10;

const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesCategory = filters.value.categories.length
            ? filters.value.categories.includes(product.category)
            : true;
        const matchesPrice = product.price >= filters.value.priceRange[0] && product.price <= filters.value.priceRange[1];
        const matchesBrand = filters.value.brands.length ? filters.value.brands.includes(product.brand) : true;
        const matchesSize = filters.value.sizes.length ? filters.value.sizes.some(size => product.sizes.includes(size)) : true;
        return matchesCategory && matchesPrice && matchesBrand && matchesSize;
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