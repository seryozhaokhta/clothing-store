<!-- src/components/ImageGallery.vue -->

<template>
    <div class="gallery-container">
        <div class="gallery">
            <div class="gallery-item" v-for="image in props.images" :key="image.id">
                <img :src="image.src" :alt="image.alt" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    images: {
        type: Array,
        required: true
    }
});

onMounted(() => {
    gsap.from('.gallery-item', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
        },
    });

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.05, duration: 0.3 });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.3 });
        });
    });
});
</script>

<style scoped>
.gallery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.gallery-item {
    width: 200px;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
