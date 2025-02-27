<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 text-white flex flex-col">
        <!-- Logo -->
        <div class="p-4 text-2xl font-bold text-center border-b border-gray-700">
          MyApp
        </div>
  
        <!-- Navigation Links -->
        <nav class="flex-1 p-4">
          <router-link 
            to="/list"
            class="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <i class="fas fa-table mr-2"></i>
            List Table
          </router-link>
  
          <router-link 
            to="/detail"
            class="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Detail
          </router-link>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 p-4">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>

  </script>
  