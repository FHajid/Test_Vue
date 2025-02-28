<template>
  <div v-if="berry" class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-6">Berry Detail</h1>

    <div class="space-y-3">
      <p><strong class="text-gray-700">Nama:</strong> <span class="text-gray-900">{{ berry.name }}</span></p>
      <p><strong class="text-gray-700">Ukuran:</strong> <span class="text-gray-900">{{ berry.size }}</span></p>
      <p><strong class="text-gray-700">Waktu Tumbuh:</strong> <span class="text-gray-900">{{ berry.growth_time }}</span></p>
      <p><strong class="text-gray-700">Maksimal Panen:</strong> <span class="text-gray-900">{{ berry.max_harvest }}</span></p>
      <p><strong class="text-gray-700">Kehalusan:</strong> <span class="text-gray-900">{{ berry.smoothness }}</span></p>
    </div>

    <router-link to="/list" class="block mt-6 text-center text-blue-500 underline">
      Kembali ke List
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const berry = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/berry/${route.params.name}`);
    berry.value = await response.json();
  } catch (error) {
    console.error("Gagal mengambil data berry:", error);
  }
});
</script>
