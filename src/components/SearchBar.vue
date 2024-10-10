<!-- src/components/SearchBar.vue -->

<template>
    <div class="search-bar">
        <input type="text" v-model="query" :placeholder="$t('search')" @keydown.enter="search" />
        <button @click="search">{{ $t('search') }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['performSearch']);
const query = ref('');

function search() {
    emits('performSearch', query.value);
}
</script>

<style scoped>
.search-bar {
    display: flex;
    justify-content: center;
    padding: 10px 0;
}

.search-bar input {
    width: 200px;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: var(--background-color);
    color: var(--text-color);
}

.search-bar button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: var(--background-color);
    color: var(--text-color);
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #f0f0f0;
}

/* Dark Mode Styles */
.search-bar {
    background-color: var(--background-color);
    color: var(--text-color);
}

.search-bar input {
    background-color: var(--background-color);
    color: var(--text-color);
}

.search-bar button {
    background-color: var(--background-color);
    color: var(--text-color);
}

.search-bar button:hover {
    background-color: #f0f0f0;
}

@media (max-width: 768px) {
    .search-bar {
        flex-direction: column;
        gap: 10px;
    }

    .search-bar input {
        width: auto;
        margin-right: 0;
    }

    .search-bar button {
        width: auto;
    }
}
</style>
