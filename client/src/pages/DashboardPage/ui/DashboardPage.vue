<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apolloClient } from "@/shared/api/apollo";
import { gql } from "@apollo/client/core";

// --- hello query ---
const message = ref<string>("");

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file)
  }
`;

const GET_HELLO = gql`
  query {
    hello
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

function fetchHello() {
  console.log("Button clicked!");
  apolloClient
    .query<{ hello: string }>({
      query: GET_HELLO,
      fetchPolicy: "network-only",
    })
    .then(({ data }) => {
      message.value = data?.hello ?? "Hello";
    })
    .catch((err) => console.error(err));
}

onMounted(() => {
  fetchHello();
});
</script>

<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <p>Server says: {{ message }}</p>
    <button @click="fetchHello">Обновить</button>
  </div>
  <div>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <img v-if="preview" :src="preview" alt="preview" width="150" />
    <button @click="saveAvatar">save</button>
  </div>
</template>


<style scoped>
.dashboard-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
}
</style>
