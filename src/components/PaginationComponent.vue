<!-- src/components/PaginationComponent.vue -->

<template>
    <div class="pagination">
        <button @click="$emit('prevPage')" :disabled="currentPage === 1">&lt;</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="$emit('nextPage')" :disabled="currentPage === totalPages">&gt;</button>
    </div>
</template>

<script setup>
defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    padding: 5px 10px;
    margin: 0 5px;
}

/* Dark Mode Styles */
.pagination {
    background-color: var(--background-color);
    color: var(--text-color);
}

.pagination button {
    background-color: var(--background-color);
    color: var(--text-color);
}

.pagination button:disabled {
    color: var(--text-color-secondary);
}
</style>

