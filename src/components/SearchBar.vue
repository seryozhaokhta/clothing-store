<!-- src/components/SearchBar.vue -->

<template>
    <div class="search-bar">
        <input type="text" v-model="query" :placeholder="$t('search')" @keydown.enter="search" />
        <button @click="search">{{ $t('search') }}</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');

function search() {
    console.log('Searching for:', query.value);
    // Здесь добавить логику поиска
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
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-bar button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #f0f0f0;
}
</style>
