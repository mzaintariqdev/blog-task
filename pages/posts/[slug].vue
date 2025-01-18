<template>
  <div class="prose mx-auto max-w-3xl mt-6">
    <!-- Back Button -->
    <div class="mb-6">
      <NuxtLink
        to="/"
        class="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back to Home
      </NuxtLink>
    </div>

    <!-- Post Content -->
    <div v-if="post">
      <h1 class="text-gray-800 font-bold">{{ post.title }}</h1>
      <p class="mt-4">{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import posts from "@/data/posts.json";
import { useRoute } from "vue-router";

const route = useRoute();
const post = posts.find((p) => p.slug === route.params.slug);
</script>
