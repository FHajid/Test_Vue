<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Berry {
  name: string;
}

const berries = ref<Berry[]>([]);

onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/berry/');
  const data = await response.json();
  berries.value = data.results;
});
</script>

<template>
  <div>
    <h1>Berries</h1>
    <ul>
      <li v-for="(berry, index) in berries" :key="index">
        {{ berry.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>