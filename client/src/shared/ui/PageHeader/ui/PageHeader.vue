<script setup lang="ts">
import cls from './PageHeader.module.scss'


defineProps<{title: string}>()
</script>

<template>
  <header :class="cls.header">
    <h1>{{ title }}</h1>
    <div :class="cls.right">
      <slot />
    </div>
  </header>
</template>
