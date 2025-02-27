<template>
    <div class="flex items-center justify-between bg-gray-200 px-4 py-2 shadow-md">
      <!-- Left side: Menu button -->
      <button class="text-gray-600 hover:text-black">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" 
                d="M2 4h16M2 10h16M2 16h16" 
                clip-rule="evenodd" />
        </svg>
      </button>
  
      <!-- Middle: Language selector -->
      <div class="flex items-center space-x-2">
        <div class="w-6 h-4 bg-red-500 border border-gray-400 relative">
          <div class="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
        </div>
        <select class="bg-gray-100 text-gray-700 rounded-md px-2 py-1">
          <option>Indonesia</option>
          <option>English</option>
        </select>
      </div>
  
      <!-- Right side: User Profile -->
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-gray-400 rounded-full"></div>
        <span class="text-gray-700">Username</span>
      </div>
    </div>
  </template>
  