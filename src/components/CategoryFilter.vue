<!-- src/components/CategoryFilter.vue -->

<template>
    <nav class="category-filter">
        <ul class="nav-links">
            <li>
                <a :class="{ active: activeCategory === 'new-arrivals' }"
                    @click.prevent="filterCategory('new-arrivals')">
                    {{ $t('newArrivals') }}
                </a>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'home-wear' }" @click.prevent="filterCategory('home-wear')">
                    {{ $t('homeWear') }}
                </a>
                <ul class="sub-links">
                    <li><a @click.prevent="filterSubcategory('home-wear', 'pajamas')">{{ $t('pajamas') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('home-wear', 'robes')">{{ $t('robes') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('home-wear', 'nightgowns')">{{ $t('nightgowns') }}</a></li>
                </ul>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'underwear' }" @click.prevent="filterCategory('underwear')">
                    {{ $t('underwear') }}
                </a>
                <ul class="sub-links">
                    <li><a @click.prevent="filterSubcategory('underwear', 'bras')">{{ $t('bras') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('underwear', 'panties')">{{ $t('panties') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('underwear', 'shapewear')">{{ $t('shapewear') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('underwear', 'bodysuits')">{{ $t('bodysuits') }}</a></li>
                </ul>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'swimwear' }" @click.prevent="filterCategory('swimwear')">
                    {{ $t('swimwear') }}
                </a>
                <ul class="sub-links">
                    <li><a @click.prevent="filterSubcategory('swimwear', 'bikinis')">{{ $t('bikinis') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('swimwear', 'onePieces')">{{ $t('onePieces') }}</a></li>
                </ul>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'socks-and-accessories' }"
                    @click.prevent="filterCategory('socks-and-accessories')">
                    {{ $t('socksAndAccessories') }}
                </a>
                <ul class="sub-links">
                    <li><a @click.prevent="filterSubcategory('socks-and-accessories', 'socks')">{{ $t('socks') }}</a>
                    </li>
                    <li><a @click.prevent="filterSubcategory('socks-and-accessories', 'tights')">{{ $t('tights') }}</a>
                    </li>
                    <li><a @click.prevent="filterSubcategory('socks-and-accessories', 'stockings')">{{ $t('stockings')
                            }}</a></li>
                    <li><a @click.prevent="filterSubcategory('socks-and-accessories', 'accessories')">{{
                        $t('accessories') }}</a></li>
                </ul>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'for-men' }" @click.prevent="filterCategory('for-men')">
                    {{ $t('forMen') }}
                </a>
                <ul class="sub-links">
                    <li><a @click.prevent="filterSubcategory('for-men', 'boxers')">{{ $t('boxers') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('for-men', 'briefs')">{{ $t('briefs') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('for-men', 't-shirts')">{{ $t('tShirts') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('for-men', 'socks')">{{ $t('socks') }}</a></li>
                    <li><a @click.prevent="filterSubcategory('for-men', 'undershirts')">{{ $t('undershirts') }}</a></li>
                </ul>
            </li>
            <li>
                <a :class="{ active: activeCategory === 'sale' }" @click.prevent="filterCategory('sale')">
                    {{ $t('sale') }}
                </a>
            </li>
        </ul>
        <button class="reset-button" @click="resetCategoryFilter">
            <img src="@/assets/catalog/refresh.svg" alt="Reset Filter" />
            {{ $t('resetFilter') }}
        </button>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['filterCategory', 'filterSubcategory', 'resetCategoryFilter']);
const activeCategory = ref('');

function filterCategory(category) {
    activeCategory.value = category;
    emits('filterCategory', { category });
}

function filterSubcategory(category, subcategory) {
    activeCategory.value = category;
    emits('filterSubcategory', { category, subcategory });
}

function resetCategoryFilter() {
    activeCategory.value = '';
    emits('resetCategoryFilter');
}
</script>

<style scoped>
.category-filter {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
    font-size: var(--font-size-medium);
}

.nav-links li {
    position: relative;
    margin: 0;
}

.nav-links a {
    text-decoration: none;
    color: var(--text-color);
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
    background-color: #ff4081;
    color: #fff;
}

.sub-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--background-color);
    list-style: none;
    padding: 10px 0;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    z-index: 1000;
}

.nav-links li:hover .sub-links {
    display: block;
}

.sub-links li a {
    display: block;
    padding: 10px 20px;
    white-space: nowrap;
    color: var(--text-color);
    transition: background-color 0.3s ease;
}

.sub-links li a:hover {
    background-color: #ff4081;
    color: #fff;
}

.reset-button {
    display: flex;
    align-items: center;
    margin-top: 20px;
    background-color: #ff4081;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    color: #fff;
    font-size: var(--font-size-base);
    transition: background-color 0.3s ease;
}

.reset-button:hover {
    background-color: #e73370;
}

.reset-button img {
    margin-right: 8px;
}

/* Dark Mode Styles */
.category-filter {
    background-color: var(--background-color);
    color: var(--text-color);
}

.nav-links a {
    color: var(--text-color);
}

.nav-links a:hover,
.nav-links a.active {
    background-color: #ff4081;
    color: #fff;
}

.sub-links {
    background-color: var(--background-color);
    color: var(--text-color);
}

.sub-links li a:hover {
    background-color: #ff4081;
    color: #fff;
}

.reset-button {
    background-color: #ff4081;
    color: #fff;
}

.reset-button:hover {
    background-color: #e73370;
}

@media (max-width: 768px) {
    .nav-links {
        flex-direction: row;
        gap: 10px;
    }

    .sub-links {
        position: static;
        box-shadow: none;
        border: none;
    }

    .reset-button {
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
}


</style>
