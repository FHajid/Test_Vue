<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Edit Produk</h1>
  
      <form @submit.prevent="updateProduct">
        <div class="mb-4">
          <label class="block text-gray-700">Nama Produk:</label>
          <input v-model="product.title" type="text" class="border p-2 rounded w-full" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Harga:</label>
          <input v-model="product.price" type="number" step="0.01" class="border p-2 rounded w-full" required />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Deskripsi:</label>
          <textarea v-model="product.description" class="border p-2 rounded w-full" required></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Gambar URL:</label>
          <input v-model="product.image" type="text" class="border p-2 rounded w-full" required />
          <img v-if="product.image" :src="product.image" alt="Preview" class="mt-2 max-w-xs" />
        </div>
  
        <div class="flex space-x-4">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
          <router-link to="/product" class="bg-gray-500 text-white px-4 py-2 rounded">Batal</router-link>
        </div>
        <router-link to="/product" class="block mt-6 text-center text-blue-500 underline">
      Kembali ke Product
    </router-link>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const product = ref({});
  
  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
      if (response.ok) {
        product.value = await response.json();
      }
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };
  
  onMounted(fetchProduct);
  
  const updateProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product.value),
      });
      if (response.ok) {
        alert("Produk berhasil diperbarui!");
        router.push("/list");
      }
    } catch (error) {
      console.error("Gagal memperbarui produk", error);
    }
  };
  </script>
  