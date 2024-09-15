<!-- src/pages/HomePage.vue -->

<template>
  <div class="homepage">
    <h1 class="homepage__title">{{ $t('welcome') }}</h1>
    <p class="homepage__subtitle">{{ $t('subtitle') }}</p>
    <HeroBanner />
    <section class="homepage__hero-section">
      <!-- Содержимое секции -->
    </section>
    <section class="homepage__gallery-section">
      <h2 class="homepage__gallery-title">{{ $t('gallerySection.title') }}</h2>
      <ImageGallery :images="images" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import HeroBanner from '@/components/HeroBanner.vue';
import ImageGallery from '@/components/ImageGallery.vue';

const images = ref([
  { id: 1, src: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725398053/8d0p3flssitonnr4iskampd0cdpmr3d8_ejxlxd.jpg', alt: 'Image 1' },
  { id: 2, src: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725398053/y7jq6z6g60nh1kt2rudjmciwna84ylzj_riaihw.jpg', alt: 'Image 2' },
  { id: 3, src: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725398053/8d0p3flssitonnr4iskampd0cdpmr3d8_ejxlxd.jpg', alt: 'Image 3' },
  { id: 4, src: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725398053/y7jq6z6g60nh1kt2rudjmciwna84ylzj_riaihw.jpg', alt: 'Image 4' },
]);

onMounted(() => {
  gsap.from('.homepage__title, .homepage__subtitle', {
    opacity: 0,
    y: 20,  // Появление снизу вверх
    duration: 1,
    ease: 'power2.out',
    stagger: 0.3,  // Задержка между анимациями
  });

  gsap.from('.homepage__gallery-title', {
    opacity: 0,
    y: 20,  // Появление снизу вверх для заголовка галереи
    duration: 1,
    ease: 'power2.out',
    delay: 0.5,  // Добавляем задержку
  });
});
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  color: var(--text-color);
}

.homepage__title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  margin-top: 40px;
  margin-bottom: 20px;
}

.homepage__subtitle {
  font-size: var(--font-size-medium);
  color: var(--text-color-secondary);
  font-weight: var(--font-weight-light);
}

.homepage__hero-section {
  text-align: center;
  margin-bottom: 50px;
}

.homepage__gallery-section {
  width: 100%;
  padding: 50px 20px;
  background-color: var(--background-alt-color);
  text-align: center;
  padding-bottom: 300px;
  overflow: visible;
  /* Убедимся, что содержимое не обрезается */
}

.homepage__gallery-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: var(--text-color);
}
</style>

