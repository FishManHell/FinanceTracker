<script setup lang="ts">
import { Avatar } from 'primevue'

interface UserAvatarProps {
  image?: string | null;
  icon?: string;
  size?: 'normal' | 'large' | 'xlarge';
  shape?: 'square' | 'circle';
}

const props = withDefaults(defineProps<UserAvatarProps>(), {
  shape: 'circle',
  size: 'large',
  icon: 'pi pi-user'
});


</script>

<template>
  <Avatar
    v-bind="props"
    :image="props.image ?? undefined"
    :icon="!props.image ? 'pi pi-user' : undefined"
  />
</template>

<style scoped></style>
