<!-- src/components/SkeletonLoader.vue -->

<template>
    <div>
        <div class="product-card__skeleton product-card__skeleton--image"></div>
        <div class="product-card__skeleton product-card__skeleton--small-text"></div>
        <div class="product-card__skeleton product-card__skeleton--text"></div>
        <div class="product-card__skeleton product-card__skeleton--tag"></div>
        <div class="product-card__skeleton-color-wrapper">
            <div class="product-card__skeleton product-card__skeleton--color" v-for="index in 3" :key="index"></div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.product-card__skeleton {
    background-color: var(--skeleton-background);
    border-radius: 4px;
    margin-bottom: 10px;
    animation: pulse 1.5s infinite;
}

.product-card__skeleton--image {
    width: 100%;
    height: 200px;
}

.product-card__skeleton--text {
    width: 100%;
    height: 20px;
}

.product-card__skeleton--small-text {
    width: 60%;
    height: 15px;
}

.product-card__skeleton--tag {
    width: 30%;
    height: 15px;
}

.product-card__skeleton-color-wrapper {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.product-card__skeleton--color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}
</style>
