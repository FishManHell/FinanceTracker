<script setup lang="ts">
import { computed } from 'vue'
import { ProfileCard } from '@/widgets/ProfileCard'
import { userStore } from '@/entities/user'

const user_store = userStore()

const user = computed(() => user_store.user)
</script>

<template>
  <ProfileCard
    v-if="user"
    :role="user.role"
    :username="user.username"
    :email="user.email"
    :avatar="user.avatar"
  />
</template>

<style scoped></style>
