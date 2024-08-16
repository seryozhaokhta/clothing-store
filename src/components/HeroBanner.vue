<!-- src/components/HeroBanner.vue -->

<template>
    <div class="hero-banner">
        <div class="hero-content">
            <h1>{{ $t('generalWelcome') }}</h1>
            <p>{{ $t('generalSubtitle') }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
    gsap.from('.hero-banner', {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: 'power2.out',
    });

    gsap.from('.hero-content h1, .hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
    });
});
</script>

<style scoped>
.hero-banner {
    width: 100%;
    height: 1080px;
    background: url('src/assets/homePage/homepagee.png') no-repeat center center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
}

.hero-content {
    text-align: center;
    z-index: 1;
}

.hero-content h1 {
    color: var(--text-color);
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.hero-content p {
    font-size: 1.5rem;
}

.hero-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: -1;
}
</style>
