<template>
  <div class="max-w-5xl mx-auto bg-white rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>

    <!-- Search & Pagination Controls -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Cari nama produk..."
      class="border p-2 rounded mb-4 w-full"
    />

    <div class="flex justify-between mb-4">
      <button @click="goToAddPage" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ $t("add") }}
      </button>

      <div>
        <label for="itemsPerPage" class="mr-2">{{ $t("view") }}</label>
        <select id="itemsPerPage" v-model="itemsPerPage" class="border p-2 rounded">
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">No</th>
          <th class="border p-2 cursor-pointer" @click="sortTable('title')">
            {{ $t("Name") }} <span v-if="sortBy === 'title'">{{ sortOrder === 'asc' ? "⬆️" : "⬇️" }}</span>
          </th>
          <th class="border p-2">{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts" :key="product.id" class="text-center">
          <td class="border p-2">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td class="border p-2">{{ product.title }}</td>
          <td class="border p-2 space-x-2">
            <router-link :to="'/detailproduct/' + product.id" class="text-blue-500 underline mr-2">
              Detail
            </router-link>
            <router-link :to="'/editproduct/' + product.id" class="text-white bg-orange-500 underline mr-2 px-2 py-1 rounded">
              Edit
            </router-link>
            <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button :disabled="currentPage === 1" @click="currentPage--" class="px-4 py-2 bg-gray-200 rounded">{{ $t("prev") }}</button>
      <span>{{ $t("Page") }} {{ currentPage }} {{ $t("of") }} {{ totalPages }}</span>
      <button :disabled="currentPage >= totalPages" @click="currentPage++" class="px-4 py-2 bg-gray-200 rounded">{{ $t("next") }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const searchQuery = ref("");
const sortBy = ref("title");
const sortOrder = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Fetch data dari API
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      products.value = await response.json();
    }
  } catch (error) {
    console.error("Gagal mengambil data produk", error);
  }
};

onMounted(fetchProducts);

// Fungsi Edit Produk
const editProduct = (id) => {
  router.push(`/edit/${id}`);
};

// Fungsi Hapus Produk
const deleteProduct = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
      if (response.ok) {
        products.value = products.value.filter((product) => product.id !== id);
      }
    } catch (error) {
      console.error("Gagal menghapus produk", error);
    }
  }
};

// Fungsi Sorting
const sortTable = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortOrder.value = "asc";
  }
  products.value.sort((a, b) => {
    let valA = a[column].toString().toLowerCase();
    let valB = b[column].toString().toLowerCase();
    return sortOrder.value === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });
};

// Fungsi Pencarian
const filteredProducts = computed(() => {
  return products.value.filter((product) => product.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Fungsi Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

const goToAddPage = () => {
  router.push("/add");
};
</script>
