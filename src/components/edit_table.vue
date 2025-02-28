<template>
    <div v-if="berry" class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Edit Berry: {{ berry.name }}</h1>
  
      <!-- Form -->
      <form @submit.prevent="updateBerry">
        <div class="mb-4">
          <label class="block font-semibold">Nama</label>
          <input v-model="berry.name" type="text" class="w-full border p-2 rounded" disabled />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Ukuran</label>
          <input v-model="berry.size" type="number" class="w-full border p-2 rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Waktu Tumbuh</label>
          <input v-model="berry.growth_time" type="number" class="w-full border p-2 rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Maksimal Panen</label>
          <input v-model="berry.max_harvest" type="number" class="w-full border p-2 rounded" required />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold">Kehalusan</label>
          <input v-model="berry.smoothness" type="number" class="w-full border p-2 rounded" required />
        </div>
  
        <!-- Button -->
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded w-full">
          Simpan Perubahan
        </button>
      </form>
  
      <!-- Alert -->
      <div v-if="successMessage" class="mt-4 bg-green-200 p-2 text-green-700 rounded">
        {{ successMessage }}
      </div>
  
      <router-link to="/list" class="text-blue-500 underline block mt-4">Kembali ke List</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const berry = ref(null);
  const successMessage = ref("");
  
  // Fetch data Berry berdasarkan nama dari URL
  onMounted(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/berry/${route.params.name}`);
    berry.value = await response.json();
  });
  
  // Simulasi update berry
  const updateBerry = () => {
    successMessage.value = "Berry berhasil diperbarui!";
    setTimeout(() => {
      router.push("/list"); // Kembali ke halaman daftar berry setelah update
    }, 2000);
  };
  </script>
  