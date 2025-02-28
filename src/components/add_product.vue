<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? "Edit Produk" : "Tambah Produk" }}</h1>

    <!-- Form -->
    <form @submit.prevent="saveProduct">
      <div class="mb-4">
        <label class="block font-semibold">Nama Produk</label>
        <input v-model="product.title" type="text" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Harga</label>
        <input v-model="product.price" type="number" class="w-full border p-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Deskripsi</label>
        <textarea v-model="product.description" class="w-full border p-2 rounded" required></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Kategori</label>
        <select v-model="product.category" class="w-full border p-2 rounded">
          <option>men's clothing</option>
          <option>women's clothing</option>
          <option>jewelery</option>
          <option>electronics</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Gambar URL</label>
        <input v-model="product.image" type="text" class="w-full border p-2 rounded" required />
      </div>

      <!-- Button -->
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {{ isEdit ? "Update Produk" : "Simpan Produk" }}
      </button>

      
    <router-link to="/product" class="block mt-6 text-center text-blue-500 underline">
      Kembali ke Product
    </router-link>
    </form>

    <!-- Alert -->
    <div v-if="successMessage" class="mt-4 bg-green-200 p-2 text-green-700 rounded">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const successMessage = ref("");
const isEdit = ref(false);
const product = ref({
  title: "",
  price: "",
  description: "",
  category: "men's clothing",
  image: ""
});

// Cek jika ada ID -> Mode Edit
onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
    if (response.ok) {
      product.value = await response.json();
    } else {
      alert("Produk tidak ditemukan!");
      router.push("/list"); // Redirect ke halaman list jika produk tidak ditemukan
    }
  }
});

const saveProduct = async () => {
  try {
    const url = isEdit.value
      ? `https://fakestoreapi.com/products/${route.params.id}`
      : "https://fakestoreapi.com/products";

    const method = isEdit.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(product.value),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      successMessage.value = isEdit.value ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!";
      setTimeout(() => {
        router.push("/list"); // Redirect ke halaman list
      }, 2000);
    } else {
      alert("Gagal menyimpan produk!");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan!");
  }
};
</script>
