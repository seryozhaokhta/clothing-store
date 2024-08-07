<!-- src/pages/HomePage.vue -->

<template>
  <div class="homepage-container">
    <section class="hero-section">
      <h1>{{ $t('welcome') }}</h1>
      <p>{{ $t('subtitle') }}</p>
    </section>
    <ImageGallery :images="images" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import ImageGallery from '@/components/ImageGallery.vue';

const images = ref([
  { id: 1, src: 'path/to/image1.jpg', alt: 'Image 1' },
  { id: 2, src: 'path/to/image2.jpg', alt: 'Image 2' },
  { id: 3, src: 'path/to/image3.jpg', alt: 'Image 3' },
  { id: 4, src: 'path/to/image4.jpg', alt: 'Image 4' },
]);

onMounted(() => {
  gsap.from('.hero-section h1, .hero-section p', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.3,
  });
});
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
}

.hero-section {
  text-align: center;
  margin-bottom: 50px;
}

.hero-section h1 {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  margin-bottom: 20px;
}

.hero-section p {
  font-size: var(--font-size-medium);
  color: var(--text-color-secondary);
  font-weight: var(--font-weight-light);
}
</style>
