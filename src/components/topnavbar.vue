<template>
  <div class="flex flex-col">
    <!-- Top Navbar -->
    <div class="w-full bg-gray-200 px-4 py-2 shadow-md flex items-center justify-between">
      <!-- Left side: Menu button -->
      <button class="text-gray-600 hover:text-black">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M2 4h16M2 10h16M2 16h16" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Middle: Language selector -->
      <div class="flex items-center space-x-2">
        <img :src="flagSrc" alt="Flag" class="w-6 h-4 border border-gray-400" />
        <select @change="changeLanguage($event)" class="bg-gray-100 text-gray-700 rounded-md px-2 py-1">
          <option value="id">{{ $t("language") }} (ID)</option>
          <option value="en">{{ $t("language") }} (EN)</option>
        </select>
      </div>

      <!-- Right side: User Profile -->
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-gray-400 rounded-full"></div>
        <span class="text-gray-700">{{ $t("username") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const changeLanguage = (event) => {
  locale.value = event.target.value;
};

// Compute flag URL dynamically from public folder
const flagSrc = computed(() => {
  return locale.value === "id" ? "./indonesia.png" : "./america.png";
});
</script>