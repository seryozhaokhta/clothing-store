<!-- src/components/FooterComponent.vue -->

<template>
    <footer class="footer-container">
        <div class="footer-content">
            <div class="footer-section">
                <h2>{{ $t('footer.company') }}</h2>
                <ul>
                    <li>{{ $t('footer.about') }}</li>
                    <li>{{ $t('footer.services') }}</li>
                    <li>{{ $t('footer.contact') }}</li>
                </ul>
            </div>
            <div class="footer-section">
                <h2>{{ $t('footer.followUs') }}</h2>
                <ul class="social-links">
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 {{ $t('footer.rightsReserved') }}</p>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

useI18n();
</script>
