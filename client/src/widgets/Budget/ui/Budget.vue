<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";

// import { gql } from "@apollo/client/core";
// import { apolloClient } from "@/shared/api/apollo";
//
// interface Account {
//   _id: string
//   userId: string
//   type: string
//   amount: number
//   currency: string
//   description: string
// }


// const GET_ACCOUNTS = gql`
//   query GetAccounts {
//     getAccounts {
//       _id
//       userId
//       type
//       amount
//       currency
//       description
//     }
//   }
//
// `;

// async function getAccounts() {
//   try {
//     const { data } = await apolloClient.query<{ accounts: Account[] }>({
//       query: GET_ACCOUNTS,
//       fetchPolicy: "network-only",
//     });
//
//     if (data?.accounts) {
//       console.log("Accounts data:", data.accounts);
//     }
//   } catch (err) {
//     console.error("Error in getAccounts:", err);
//   }
// }

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["card", "cash", "investments", "cumulation"],
    datasets: [
      {
        data: [5200, 2600, 3250, 1950],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
          documentStyle.getPropertyValue('--p-green-500'),
          documentStyle.getPropertyValue('--p-purple-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
          documentStyle.getPropertyValue('--p-green-400'),
          documentStyle.getPropertyValue('--p-purple-400')
        ]
      }
    ]
  };
};


const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  };
};

</script>

<template>
  <header>
    <h1>Budget</h1>
  </header>
  <main>
    <section>
      <h2>$13000</h2>
    </section>
    <section>
      <Chart type="doughnut" :data="chartData" :options="chartOptions"/>
    </section>
<!--    <button @click="getAccounts">Click</button>-->
  </main>
</template>

<style scoped></style>
