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
    background-color: #f7f7f7;
    padding: 10px 0;
}

.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
}

.nav-links li {
    position: relative;
    margin: 0;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
    white-space: nowrap;
}

.sub-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    list-style: none;
    padding: 10px 0;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.nav-links li:hover .sub-links {
    display: block;
}

.sub-links li a {
    display: block;
    padding: 5px 15px;
    white-space: nowrap;
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

.sub-links {
    background-color: var(--background-color);
    color: var(--text-color);
}

.reset-button {
    color: var(--text-color);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        gap: 10px;
    }

    .sub-links {
        position: static;
        box-shadow: none;
        border: none;
    }

    .reset-button {
        margin-top: 20px;
    }
}
</style>
