<script setup lang="ts">

import { gql } from '@apollo/client'
import { ref } from 'vue'
import { apolloClient } from '@/shared/api/apollo.ts'

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file)
  }
`;
const preview = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

async function saveAvatar() {
  if (!selectedFile.value) return;
  console.log(selectedFile.value, "selectedFile.value")

  const { data } = await apolloClient.mutate<{ uploadAvatar: string }>({
    mutation: UPLOAD_AVATAR,
    variables: { file: selectedFile.value },
  });

  console.log("Avatar URL:", data?.uploadAvatar);
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  selectedFile.value = file;
  preview.value = URL.createObjectURL(file);
}
</script>

<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <img v-if="preview" :src="preview" alt="preview" width="150" />
    <button @click="saveAvatar">save</button>
  </div>
</template>

<style scoped></style>
