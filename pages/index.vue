<template>
  <div>
    <!-- Search Bar -->
    <SearchBar :searchQuery="searchQuery" @updateQuery="updateQuery" />

    <!-- Blog Posts -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
        class="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition transform"
      >
        <h2 class="text-lg font-semibold text-gray-800">{{ post.title }}</h2>
        <p class="mt-2 text-gray-600">{{ post.excerpt }}</p>
        <NuxtLink
          :to="'/posts/' + post.slug"
          class="mt-4 inline-block text-blue-600 hover:underline font-semibold"
        >
          Read More →
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalItems="filteredPosts.length"
      :itemsPerPage="postsPerPage"
      @changePage="setPage"
    />
  </div>
</template>

<script setup>
import posts from "@/data/posts.json";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import { ref, computed, watch } from "vue";

const searchQuery = ref(""); // Track the search query
const currentPage = ref(1); // Track the current page number
const postsPerPage = 3; // Number of posts per page

// Update the search query and reset to the first page only if necessary
const updateQuery = (query) => {
  searchQuery.value = query;

  // Check if the current page is valid for the filtered results
  const totalFilteredPages = Math.ceil(filteredPosts.value.length / postsPerPage);
  if (currentPage.value > totalFilteredPages) {
    currentPage.value = totalFilteredPages || 1; // Default to the first page if no results
  }
};

// Filter posts based on the search query
const filteredPosts = computed(() =>
  posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Get paginated posts for the current page
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredPosts.value.slice(start, start + postsPerPage);
});

// Update the current page when pagination changes
const setPage = (page) => {
  currentPage.value = page;
};
</script>
