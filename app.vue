<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">My Blog</h1>
        <nav>
          <NuxtLink to="/" class="text-white hover:underline mr-4">Home</NuxtLink>
          <NuxtLink to="/contact" class="text-white hover:underline">Contact</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-4">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>© 2025 My Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// No additional setup required
</script>
