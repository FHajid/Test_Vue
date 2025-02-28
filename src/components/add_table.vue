<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Tambah Berry Baru</h1>
  
      <!-- Form -->
      <form @submit.prevent="addBerry">
        <div class="mb-4">
          <label class="block font-semibold">Nama</label>
          <input v-model="berry.name" type="text" class="w-full border p-2 rounded" required />
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
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Tambah Berry
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const successMessage = ref("");
  const berry = ref({
    name: "",
    size: "",
    growth_time: "",
    max_harvest: "",
    smoothness: "",
  });
  
  // Simulasi penambahan berry baru
  const addBerry = () => {
    console.log("Berry baru ditambahkan:", berry.value);
    successMessage.value = "Berry berhasil ditambahkan!";
    setTimeout(() => {
      router.push("/list"); // Kembali ke halaman daftar berry
    }, 2000);
  };
  </script>
  