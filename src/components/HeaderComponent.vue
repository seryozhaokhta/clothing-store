<!-- src/components/HeaderComponent.vue -->

<template>
    <header :style="{ backgroundColor: 'var(--header-background)', color: 'var(--header-text-color)' }">
        <nav>
            <ul>
                <li><router-link to="/">{{ $t('home') }}</router-link></li>
                <li><router-link to="/catalog">{{ $t('catalog') }}</router-link></li>
                <li><router-link to="/cart">{{ $t('cart') }}</router-link></li>
                <li><router-link to="/checkout">{{ $t('checkout') }}</router-link></li>
                <li><router-link to="/contact">{{ $t('contact') }}</router-link></li>
                <li><router-link to="/about">{{ $t('about') }}</router-link></li>
                <li><router-link to="/product">{{ $t('product') }}</router-link></li>
            </ul>
        </nav>
        <div>
            <button @click="changeLocale('en')">EN</button>
            <button @click="changeLocale('ru')">RU</button>
            <button @click="toggleTheme">
                <img :src="themeIcon" alt="Theme Toggle" />
            </button>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import darkModeIcon from '@/assets/header/dark_mode.svg';
import lightModeIcon from '@/assets/header/light_mode.svg';

const { locale } = useI18n();
const isDarkMode = ref(false);

const themeIcon = computed(() => isDarkMode.value ? darkModeIcon : lightModeIcon);

function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
}

function changeLocale(lang) {
    locale.value = lang;
}
</script>

<style scoped></style>
