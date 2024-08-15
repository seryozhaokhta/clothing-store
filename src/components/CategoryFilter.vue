<!-- src/components/CategoryFilter.vue -->

<template>
    <nav class="category-filter">
        <ul class="nav-links">
            <li><a @click.prevent="filterCategory('new-arrivals')">{{ $t('newArrivals') }}</a></li>
            <li><a @click.prevent="filterCategory('home-wear')">{{ $t('homeWear') }}</a></li>
            <li><a @click.prevent="filterCategory('underwear')">{{ $t('underwear') }}</a></li>
            <li><a @click.prevent="filterCategory('swimwear')">{{ $t('swimwear') }}</a></li>
            <li><a @click.prevent="filterCategory('socks-and-accessories')">{{ $t('socksAndAccessories') }}</a></li>
            <li><a @click.prevent="filterCategory('erotic-lingerie')">{{ $t('eroticLingerie') }}</a></li>
            <li><a @click.prevent="filterCategory('for-men')">{{ $t('forMen') }}</a></li>
            <li><a @click.prevent="filterCategory('sale')">{{ $t('sale') }}</a></li>
        </ul>
        <button class="reset-button" @click="resetCategoryFilter">
            <img src="@/assets/catalog/refresh.svg" alt="Reset Filter" />
            {{ $t('resetFilter') }}
        </button>
    </nav>
</template>

<script setup>
const emits = defineEmits(['filterCategory', 'resetCategoryFilter']);

function filterCategory(category) {
    emits('filterCategory', category);
}

function resetCategoryFilter() {
    emits('resetCategoryFilter');
}
</script>

<style scoped>
.category-filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    padding: 10px 0;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    /* Ensure items wrap on smaller screens */
    gap: 15px;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
    /* Center the content */
}

.nav-links li {
    margin: 0;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
    white-space: nowrap;
    /* Prevent text wrapping inside links */
}

.nav-links a:hover {
    color: #ff4081;
    text-decoration: underline;
}

.reset-button {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
}

.reset-button img {
    margin-right: 5px;
}

/* Dark Mode Styles */
.category-filter {
    background-color: var(--background-color);
    color: var(--text-color);
}

.nav-links a {
    color: var(--text-color);
}

.nav-links a:hover {
    color: #ff4081;
}

.reset-button {
    color: var(--text-color);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        /* Stack links vertically on smaller screens */
        gap: 10px;
    }

    .reset-button {
        margin-top: 20px;
    }
}
</style>

