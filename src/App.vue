<template>
    <div class="flex flex-col h-screen">
      <topnavbar />
      <div class="flex flex-grow">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-300 text-black flex flex-col h-full">
          <div class="p-4 text-2xl font-bold text-center border-b border-gray-400">
            Logo
          </div>
          <div class="p-4 border-b border-gray-400 flex items-center">
            <span class="w-8 h-8 bg-gray-400 flex items-center justify-center rounded mr-2">🔧</span>
            <select v-model="locale" class="bg-white text-gray-700 border px-2 py-1 rounded w-full">
              <option value="id">Nama Module</option>
            </select>
          </div>
          <nav class="flex-1 p-4">
            <template v-for="(item, index) in menuItems" :key="index">
              <router-link 
                :to="item.path" 
                class="block p-2 rounded hover:bg-gray-400 transition"
              >
                {{ $t(item.label) }}
              </router-link>
            </template>
          </nav>
        </aside>
        
        <!-- Main Content -->
        <div class="flex-1 p-4 bg-white overflow-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import topnavbar from "./components/topnavbar.vue";
  
  const { locale } = useI18n();
  
  const menuItems = ref([
    { path: "/list", label: "listtable" },
    { path: "/product", label: "addproduct" },
  ]);
  
  // Compute flag URL dynamically from public folder
  const flagSrc = computed(() => {
    return locale.value === "id" ? "/path/to/indonesia-flag.png" : "/path/to/america-flag.png";
  });
  </script>