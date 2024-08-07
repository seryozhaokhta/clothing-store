<!-- src/pages/ContactPage.vue -->

<template>
    <div class="contactpage-container">
        <section class="contact-section">
            <h1>{{ $t('contact') }}</h1>
            <p>{{ $t('contactSubtitle') }}</p>
        </section>
        <section class="contact-info">
            <h2>{{ $t('contactInfoTitle') }}</h2>
            <p>{{ $t('contactInfo') }}</p>
            <p>{{ $t('contactParagraph') }}</p>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const elements = document.querySelectorAll('.contact-section, .contact-info');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
</script>

<style scoped>
.contactpage-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.contact-section,
.contact-info {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.contact-section {
    text-align: center;
    margin-bottom: 50px;
}

.contact-section h1 {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    margin-bottom: 20px;
}

.contact-section p {
    font-size: var(--font-size-medium);
    color: var(--text-color-secondary);
    font-weight: var(--font-weight-light);
}

.contact-info {
    text-align: center;
    margin-bottom: 50px;
}

.contact-info h2 {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-normal);
    margin-bottom: 20px;
}

.contact-info p {
    font-size: var(--font-size-base);
    color: var(--text-color-secondary);
    font-weight: var(--font-weight-light);
}
</style>
