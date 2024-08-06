<!-- src/components/HeaderComponent.vue -->

<template>
    <header>
        <nav v-if="!isMobile">
            <ul class="navigation-links">
                <li><router-link to="/">{{ $t('home') }}</router-link></li>
                <li><router-link to="/catalog">{{ $t('catalog') }}</router-link></li>
                <li><router-link to="/cart">{{ $t('cart') }}</router-link></li>
                <li><router-link to="/checkout">{{ $t('checkout') }}</router-link></li>
                <li><router-link to="/contact">{{ $t('contact') }}</router-link></li>
                <li><router-link to="/about">{{ $t('about') }}</router-link></li>
                <li><router-link to="/product">{{ $t('product') }}</router-link></li>
            </ul>
        </nav>
        <div v-else class="burger-menu" @click="toggleDrawer">
            <div :class="{ 'burger-menu-open': drawer }"></div>
        </div>
        <div class="header-controls">
            <div class="language-toggle">
                <div class="highlight" :style="highlightStyle"></div>
                <button class="language-button" :class="{ active: locale.value === 'en' }" @click="changeLocale('en')"
                    ref="enButton">
                    EN
                </button>
                <button class="language-button" :class="{ active: locale.value === 'ru' }" @click="changeLocale('ru')"
                    ref="ruButton">
                    RU
                </button>
            </div>
            <button class="theme-toggle" @click="toggleTheme">
                <img :src="themeIcon" alt="Theme Toggle" />
            </button>
        </div>
        <div v-if="drawer" class="drawer">
            <ul class="drawer-links">
                <li><router-link @click="closeDrawer" to="/">{{ $t('home') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/catalog">{{ $t('catalog') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/cart">{{ $t('cart') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/checkout">{{ $t('checkout') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/contact">{{ $t('contact') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/about">{{ $t('about') }}</router-link></li>
                <li><router-link @click="closeDrawer" to="/product">{{ $t('product') }}</router-link></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import darkModeIcon from '@/assets/header/dark_mode.svg';
import lightModeIcon from '@/assets/header/light_mode.svg';

const { locale } = useI18n();
const isDarkMode = ref(false);
const drawer = ref(false);
const isMobile = ref(window.innerWidth <= 768);

const themeIcon = computed(() => isDarkMode.value ? darkModeIcon : lightModeIcon);

const enButton = ref(null);
const ruButton = ref(null);

const highlightStyle = computed(() => {
    const button = locale.value === 'en' ? enButton.value : ruButton.value;
    return {
        left: `${button?.offsetLeft}px`,
        width: `${button?.offsetWidth}px`
    };
});

function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    const theme = isDarkMode.value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

function changeLocale(lang) {
    locale.value = lang;
}

function checkMobile() {
    isMobile.value = window.innerWidth <= 768;
}

function toggleDrawer() {
    drawer.value = !drawer.value;
}

function closeDrawer() {
    if (drawer.value) {
        drawer.value = false;
    }
}

onMounted(() => {
    window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped></style>
