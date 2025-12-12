<script setup lang="ts">
import { NavBar } from '@/widgets/NavBar';
import DynamicDialog from 'primevue/dynamicdialog';


</script>

<template>
  <div class="app_layout">
    <NavBar/>
    <router-view />
    <DynamicDialog/>
  </div>
</template>

