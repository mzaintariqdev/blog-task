<template>
  <header class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto flex justify-between items-center p-4">
      <h1 class="text-xl font-bold tracking-wide">
        <NuxtLink to="/" class="hover:text-gray-200 transition">My Blog</NuxtLink>
      </h1>
      <nav class="space-x-6">
        <NuxtLink
          to="/"
          class="hover:text-gray-200 transition"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="hover:text-gray-200 transition"
        >
          Contact
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
