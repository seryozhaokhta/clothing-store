<!-- src/components/HeroBanner.vue -->

<template>
    <div class="hero-banner" :style="{ backgroundImage: `url(${currentCollection.image})` }">
        <div class="hero-content">
            <h1>{{ currentCollection.title }}</h1>
            <p>{{ currentCollection.subtitle }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const collections = ref([
    {
        id: 1,
        title: '',
        subtitle: '',
        image: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725554767/Remove-bg.ai_1723739211942_mi0doc.png',
    },
    {
        id: 2,
        title: '',
        subtitle: '',
        image: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725556901/BRAFF-Gracija-Rim-ASSOL-10032-03_mxcxva_qw4tpv.png',
    },
    {
        id: 3,
        title: '',
        subtitle: '',
        image: 'https://res.cloudinary.com/du1uu7nev/image/upload/v1725556898/removal.ai__ff6d4a55-9900-4dd2-9867-9cd3f64e3569-obgggx7o0yq7qfuxrwlbxaxfk3j6sjor_ebk5lf_OO6HX2_y7gu6g.png',
    },
]);

const currentCollectionIndex = ref(0);
const currentCollection = ref(collections.value[currentCollectionIndex.value]);

const updateCollectionTitles = () => {
    collections.value[0].title = t('melleCollectionHeroBanner');
    collections.value[0].subtitle = t('melleSubtitle');
    collections.value[1].title = t('gracijaCollectionHeroBanner');
    collections.value[1].subtitle = t('gracijaSubtitle');
    collections.value[2].title = t('julimexCollectionHeroBanner');
    collections.value[2].subtitle = t('julimexSubtitle');
    currentCollection.value = collections.value[currentCollectionIndex.value];
};

const changeSlide = () => {
    currentCollectionIndex.value = (currentCollectionIndex.value + 1) % collections.value.length;
    currentCollection.value = collections.value[currentCollectionIndex.value];

    gsap.from('.hero-content h1, .hero-content p', {
        opacity: 0,
        ease: 'power2.out',
    });

    gsap.from('.hero-image', {
        opacity: 0,
        ease: 'power2.out',
    });
};


onMounted(() => {
    updateCollectionTitles();

    gsap.from('.hero-content h1, .hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
    });

    gsap.from('.hero-banner', {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
    });

    setInterval(changeSlide, 5000); // Меняем слайды каждые 5 секунд
});

// Обновляем названия коллекций при изменении локали
watch(locale, updateCollectionTitles);
</script>

<style scoped>
.hero-banner {
    width: 100%;
    height: 1080px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    position: relative;
    padding-left: 5%;
    transition: background-image 1s ease;
}

.hero-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.hero-content {
    text-align: left;
    z-index: 1;
    max-width: 600px;
}

.hero-content h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: var(--text-color);
}

.hero-content p {
    font-size: 1.5rem;
    color: #ccc;
}

@media (max-width: 768px) {
    .hero-banner {
        height: 600px;
        padding-left: 2%;
    }

    .hero-content h1 {
        font-size: 2rem;
    }

    .hero-content p {
        font-size: 1.2rem;
    }
}
</style>
