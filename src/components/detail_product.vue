<template>
    <div v-if="product" class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-center mb-6">Detail Produk</h1>
      
      <div class="space-y-3">
        <p><strong class="text-gray-700">Nama:</strong> <span class="text-gray-900">{{ product.title }}</span></p>
        <p><strong class="text-gray-700">Harga:</strong> <span class="text-gray-900">Rp {{ product.price }}</span></p>
        <p><strong class="text-gray-700">Kategori:</strong> <span class="text-gray-900">{{ product.category }}</span></p>
        <p><strong class="text-gray-700">Deskripsi:</strong> <span class="text-gray-900">{{ product.description }}</span></p>
      </div>
  
      <router-link to="/product" class="block mt-6 text-center text-blue-500 underline">
        Kembali ke Product
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const product = ref(null);
  
  onMounted(async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
      product.value = await response.json();
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  });
  </script>
  