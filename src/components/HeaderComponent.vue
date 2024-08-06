<!-- src/components/HeaderComponent.vue -->

<template>
    <header>
        <div class="left-section">
            <router-link class="home-link" to="/">
                <img src="@/assets/header/home.svg" alt="Home" />
                <span>{{ $t('home') }}</span>
            </router-link>
        </div>
        <nav class="center-section navigation-links-container">
            <ul class="navigation-links">
                <li><router-link to="/catalog">{{ $t('catalog') }}</router-link></li>
                <li><router-link to="/cart">{{ $t('cart') }}</router-link></li>
                <li><router-link to="/checkout">{{ $t('checkout') }}</router-link></li>
                <li><router-link to="/contact">{{ $t('contact') }}</router-link></li>
                <li><router-link to="/about">{{ $t('about') }}</router-link></li>
                <li><router-link to="/product">{{ $t('product') }}</router-link></li>
            </ul>
        </nav>
        <div class="burger-menu" @click="toggleDrawer">
            <div class="line line-1" :class="{ 'burger-menu-open': drawer }"></div>
            <div class="line line-2" :class="{ 'burger-menu-open': drawer }"></div>
            <div class="line line-3" :class="{ 'burger-menu-open': drawer }"></div>
        </div>
        <div class="right-section header-controls-container">
            <div class="header-controls">
                <div class="language-toggle">
                    <div class="highlight" :style="highlightStyle"></div>
                    <button class="language-button" :class="{ active: locale.value === 'en' }"
                        @click="changeLocale('en')" ref="enButton">
                        EN
                    </button>
                    <button class="language-button" :class="{ active: locale.value === 'ru' }"
                        @click="changeLocale('ru')" ref="ruButton">
                        RU
                    </button>
                </div>
                <button class="theme-toggle" @click="toggleTheme">
                    <img :src="themeIcon" alt="Theme Toggle" />
                </button>
            </div>
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
                <li class="drawer-locale">
                    <div class="language-toggle">
                        <div class="highlight" :style="highlightStyle"></div>
                        <button class="language-button" :class="{ active: locale.value === 'en' }"
                            @click="changeLocale('en')" ref="enButtonDrawer">
                            EN
                        </button>
                        <button class="language-button" :class="{ active: locale.value === 'ru' }"
                            @click="changeLocale('ru')" ref="ruButtonDrawer">
                            RU
                        </button>
                    </div>
                    <button class="theme-toggle drawer-theme-toggle" @click="toggleTheme">
                        <img :src="themeIcon" alt="Theme Toggle" />
                    </button>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import darkModeIcon from '@/assets/header/dark_mode.svg';
import lightModeIcon from '@/assets/header/light_mode.svg';

const { locale } = useI18n();
const isDarkMode = ref(false);
const drawer = ref(false);

const themeIcon = computed(() => isDarkMode.value ? darkModeIcon : lightModeIcon);

const enButton = ref(null);
const ruButton = ref(null);
const enButtonDrawer = ref(null);
const ruButtonDrawer = ref(null);

const highlightStyle = computed(() => {
    const button = locale.value === 'en' ? (drawer.value ? enButtonDrawer.value : enButton.value) : (drawer.value ? ruButtonDrawer.value : ruButton.value);
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
    nextTick(() => {
        const button = lang === 'en' ? (drawer.value ? enButtonDrawer.value : enButton.value) : (drawer.value ? ruButtonDrawer.value : ruButton.value);
        button.focus();
    });
}

function toggleDrawer() {
    drawer.value = !drawer.value;
}

function closeDrawer() {
    if (drawer.value) {
        drawer.value = false;
    }
}
</script>
