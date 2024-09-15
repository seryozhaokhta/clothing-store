<!-- src/pages/ContactPage.vue -->

<template>
    <div class="contact-page">
        <section class="contact-page__section">
            <h1 class="contact-page__title">{{ $t('contact') }}</h1>
            <p class="contact-page__description">{{ $t('contactParagraph') }}</p>
        </section>
        <section class="contact-page__info">
            <h2 class="contact-page__info-title">{{ $t('contactInfoTitle') }}</h2>
            <p class="contact-page__info-text">{{ $t('phone') }}: +123456789</p>
            <p class="contact-page__info-text">{{ $t('email') }}: contact@gabrielstore.com</p>
            <div class="contact-page__map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1110.6206512051435!2d40.47461493054167!3d56.17022147239224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414c7b179b335d2f%3A0xa08027e0d27f33db!2z0JLQvtGB0YLQvtC6LTE!5e0!3m2!1sru!2sge!4v1723028702476!5m2!1sru!2sge"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    nextTick(() => {
        gsap.from('.contact-page__title, .contact-page__description', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.3,
        });

        gsap.from('.contact-page__info-title, .contact-page__info-text', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.3,
        });

        gsap.from('.contact-page__map', {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-page__map',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: true,
            },
        });
    });
});
</script>

<style scoped>
.contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Центрируем содержимое */
    padding: 40px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.contact-page__section {
    text-align: center;
    /* Центрируем текст */
    margin-bottom: 50px;
    max-width: 800px;
}

.contact-page__title {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    margin-bottom: 20px;
}

.contact-page__description {
    font-size: var(--font-size-medium);
    color: var(--text-color-secondary);
    line-height: 1.6;
    text-align: left;
}

.contact-page__info {
    text-align: center;
    /* Центрируем текст */
    margin-bottom: 50px;
    max-width: 800px;
}

.contact-page__info-title {
    font-size: 1.75rem;
    font-weight: var(--font-weight-normal);
    margin-bottom: 20px;
}

.contact-page__info-text {
    font-size: 1rem;
    color: var(--text-color-secondary);
    margin-bottom: 10px;
}

.contact-page__map {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
}
</style>

