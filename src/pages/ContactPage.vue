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
            <div class="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9172881282327!2d127.02860181586624!3d37.497903079808134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3b6c9d8eabf%3A0x69f3a3e15d3e2456!2sGoogle%20Korea!5e0!3m2!1sen!2skr!4v1614177526194!5m2!1sen!2skr"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const elements = document.querySelectorAll('.contact-section h1, .contact-section p, .contact-info h2, .contact-info p, .map-container');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('fade-in-up');
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

.map-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
}

/* CSS Animations */
.fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s forwards ease-out;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
