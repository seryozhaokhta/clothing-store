<!-- src/App.vue -->

<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'; // убедитесь, что путь правильный
</script>

<style>
/* Глобальные стили будут добавлены позже */
</style>
