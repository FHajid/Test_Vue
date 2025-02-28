<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">List Tabel</h1>

    <!-- Search Bar -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Cari nama berry..."
      class="border p-2 rounded mb-4 w-full"
    />

    <!-- Pagination Controls -->
    <div class="flex justify-between mb-4">
      <button @click="goToAddPage" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ $t("add") }}
      </button>

      <div>
        <label for="perPage" class="mr-2"> {{ $t("view") }}</label>
        <select id="perPage" v-model="perPage" class="border p-2 rounded">
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">No</th>
          <th class="border p-2 cursor-pointer" @click="sortByName">
            {{ $t("Name") }}
            <span v-if="sortOrder === 'asc'">⬆️</span>
            <span v-if="sortOrder === 'desc'">⬇️</span>
          </th>
          <th class="border p-2">{{ $t("action") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(berry, index) in paginatedBerries" :key="berry.name" class="text-center">
          <td class="border p-2">{{ index + 1 + (currentPage - 1) * perPage }}</td>
          <td class="border p-2">{{ berry.name }}</td>
          <td class="border p-2">
            <router-link :to="'/detailtable/' + berry.name" class="text-blue-500 underline mr-2">
              Detail
            </router-link>
            
            <router-link :to="'/edittable/' + berry.name" class="text-white bg-orange-500  mr-2 px-2">
              Edit
            </router-link>
            <button @click="deleteBerry(berry.name)" class="text-white bg-red-500 px-2 " >Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Buttons -->
    <div class="flex justify-between mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-gray-400 px-4 py-2 rounded text-white disabled:opacity-50"
      >
      {{ $t("prev") }}
      </button>

      <p>  {{ $t("Page") }} {{ currentPage }} {{ $t("of") }} {{ totalPages }}</p>

      <button
        @click="nextPage"
        :disabled="currentPage >= totalPages"
        class="bg-gray-400 px-4 py-2 rounded text-white disabled:opacity-50"
      >
      {{ $t("next") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const berries = ref([]);
const searchQuery = ref("");
const perPage = ref(10);
const currentPage = ref(1);
const sortOrder = ref("asc"); // Default: ascending

onMounted(async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/berry/");
    const data = await response.json();

    // Fetch full details of each berry
    berries.value = await Promise.all(
      data.results.map(async (item, index) => {
        const berryDetail = await fetch(item.url).then((res) => res.json());
        return {
          no: index + 1,
          name: berryDetail.name,
        };
      })
    );

    // Sort initially
    sortBerries();
  } catch (error) {
    console.error("Failed to fetch berries:", error);
  }
});

// **🔹 Sorting Function**
const sortBerries = () => {
  berries.value.sort((a, b) => {
    return sortOrder.value === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
};

// **🔹 Sort by Name (Toggle Asc/Desc)**
const sortByName = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  sortBerries();
};

// **🔹 Search Function**
const filteredBerries = computed(() => {
  return berries.value.filter((berry) =>
    berry.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// **🔹 Pagination Functions**
const totalPages = computed(() => Math.ceil(filteredBerries.value.length / perPage.value));

const paginatedBerries = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredBerries.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// **🔹 Edit Function (Mock)**
const editBerry = (berry) => {
  alert("Edit Berry: " + berry.name);
};

// **🔹 Delete Function (Mock)**
const deleteBerry = (name) => {
  const confirmDelete = confirm(`Yakin ingin menghapus ${name}?`);
  if (confirmDelete) {
    berries.value = berries.value.filter((berry) => berry.name !== name);
  }
};

// **🔹 Navigate to Add Page**
const goToAddPage = () => {
  router.push("/addtable");
};
</script>
