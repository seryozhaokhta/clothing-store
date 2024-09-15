<!-- src/components/HeroBanner.vue -->

<template>
    <div class="hero-banner">
        <!-- Обёртка для изображений с переходом -->
        <transition name="fade" mode="out-in">
            <div :key="currentCollection.id" class="hero-image"
                :style="{ backgroundImage: `url(${currentCollection.image})` }"></div>
        </transition>

        <!-- Обёртка для текста с переходом -->
        <transition name="fade-up" mode="out-in">
            <div class="hero-content" :key="currentCollection.id">
                <h1>{{ currentCollection.title }}</h1>
                <p>{{ currentCollection.subtitle }}</p>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// Получение переводов
const { t, locale } = useI18n();

// Коллекции с изображениями и текстом
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

// Индекс текущей коллекции
const currentCollectionIndex = ref(0);
const currentCollection = ref(collections.value[currentCollectionIndex.value]);

// Обновление заголовков и подзаголовков при изменении локали
const updateCollectionTitles = () => {
    collections.value[0].title = t('melleCollectionHeroBanner');
    collections.value[0].subtitle = t('melleSubtitle');
    collections.value[1].title = t('gracijaCollectionHeroBanner');
    collections.value[1].subtitle = t('gracijaSubtitle');
    collections.value[2].title = t('julimexCollectionHeroBanner');
    collections.value[2].subtitle = t('julimexSubtitle');
    currentCollection.value = collections.value[currentCollectionIndex.value];
};

// Функция смены слайда
const changeSlide = () => {
    currentCollectionIndex.value = (currentCollectionIndex.value + 1) % collections.value.length;
    currentCollection.value = collections.value[currentCollectionIndex.value];
};

// Монтирование компонента
onMounted(() => {
    updateCollectionTitles();
    setInterval(changeSlide, 5000); // Смена слайдов каждые 5 секунд
});

// Обновление заголовков при изменении локали
watch(locale, () => {
    updateCollectionTitles();
});
</script>

<style scoped>
.hero-banner {
    position: relative;
    width: 100%;
    height: 1080px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--background-color);
    overflow: hidden;
    /* Фоновый цвет на время загрузки изображений */
}

/* Стили для изображений */
.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

/* Стили для контента */
.hero-content {
    position: relative;
    z-index: 1;
    text-align: left;
    padding-left: 5%;
    max-width: 600px;
    color: var(--text-color);
}

/* Переходы для изображений */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Переходы для текста с небольшим сдвигом вверх */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .hero-banner {
        height: 600px;
        padding-left: 2%;
        flex-direction: column;
        justify-content: flex-end;
        /* Размещаем контент внизу */
        align-items: center;
        /* Центрируем горизонтально */
    }

    .hero-content {
        padding-left: 0;
        padding: 20px;
        text-align: left;
        background-color: var(--background-color);
        /* Добавим полупрозрачный фон для лучшей читаемости */
        width: 100%;
    }

    .hero-content h1 {
        font-size: 2rem;
    }

    .hero-content p {
        font-size: 1.2rem;
    }

    .hero-image {
        background-size: cover;
        /* Лучше заполняет пространство на мобильных */
    }
}
</style>
