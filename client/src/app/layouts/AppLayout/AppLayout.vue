<script setup lang="ts">
import { NavBar } from '@/widgets/NavBar'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<template>
  <div class="app_layout">
    <NavBar />
    <div class="app_layout_content">
      <router-view />
    </div>
    <DynamicDialog />
    <ConfirmDialog :closable="false" />
  </div>
</template>
