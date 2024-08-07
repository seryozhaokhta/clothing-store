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
import { onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    nextTick(() => {
        if (document.querySelector('.contact-section h1')) {
            gsap.from('.contact-section h1, .contact-section p, .contact-info h2, .contact-info p', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.3,
            });
        } else {
            console.error('GSAP: target .contact-section h1, .contact-section p, .contact-info h2, .contact-info p not found');
        }

        if (document.querySelector('.map-container')) {
            gsap.from('.map-container', {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.map-container',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                },
            });
        } else {
            console.error('GSAP: target .map-container not found');
        }
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
</style>
