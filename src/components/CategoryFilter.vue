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
            <li><a @click.prevent="filterCategory('for-kids')">{{ $t('forKids') }}</a></li>
            <li><a @click.prevent="filterCategory('brands')">{{ $t('brands') }}</a></li>
            <li><a @click.prevent="filterCategory('sale')">{{ $t('sale') }}</a></li>
        </ul>
    </nav>
</template>

<script setup>
const emits = defineEmits(['filterCategory']);

function filterCategory(category) {
    emits('filterCategory', category);
}
</script>

<style scoped>
.category-filter {
    display: flex;
    justify-content: center;
    background-color: #f7f7f7;
    padding: 10px 0;
}

.nav-links {
    display: flex;
    gap: 15px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin: 0;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
}

.nav-links a:hover {
    color: #ff4081;
    text-decoration: underline;
}
</style>
