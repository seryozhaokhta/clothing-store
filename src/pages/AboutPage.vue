<!-- src/pages/AboutPage.vue -->

<template>
    <div class="about-page">
        <h1>{{ $t('aboutSection.title') }}</h1>
        <p>{{ $t('aboutSection.history') }}</p>
        <p>{{ $t('aboutSection.mission') }}</p>
        <p>{{ $t('aboutSection.team') }}</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
    gsap.from('.about-page h1, .about-page p', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
    });
});
</script>

<style scoped>
.about-page {
    text-align: left;
    margin-top: 50px;
    padding: 20px;
}

h1 {
    text-align: center;
    font-size: var(--font-size-large);
    margin-bottom: 20px;
}

p {
    font-size: var(--font-size-medium);
    line-height: 1.8;
    margin-bottom: 20px;
    color: var(--text-color-secondary);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2em;
        /* Уменьшаем размер заголовка на мобильных устройствах */
    }

    p {
        font-size: 1em;
        /* Уменьшаем размер текста на мобильных устройствах */
        padding: 0 15px;
        /* Добавляем отступы для лучшего восприятия на маленьких экранах */
    }
}
</style>
