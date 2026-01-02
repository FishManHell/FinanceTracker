<script setup lang="ts">
import { NavBar } from '@/widgets/NavBar'
import DynamicDialog from 'primevue/dynamicdialog'
</script>

<template>
  <div class="app_layout">
    <NavBar />
    <div class="app_layout_content">
      <router-view />
    </div>
    <DynamicDialog />
  </div>
</template>
