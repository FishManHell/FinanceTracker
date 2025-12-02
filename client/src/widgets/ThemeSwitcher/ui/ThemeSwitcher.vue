<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';

const isDarkMode = ref(false);

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark');
  isDarkMode.value = !isDarkMode.value;
}
</script>

<template>
  <Button
    @click="toggleDarkMode"
    :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
  />

</template>
