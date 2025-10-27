<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apolloClient } from "@/shared/api/apollo";
import { gql } from "@apollo/client/core";

// --- hello query ---
const message = ref<string>("");

const GET_HELLO = gql`
  query {
    hello
  }
`;

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
