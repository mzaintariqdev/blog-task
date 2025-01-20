<template>
  <div>
    <!-- Search Bar -->
    <SearchBar :searchQuery="searchQuery" @updateQuery="updateQuery" />

    <!-- Loading State -->
    <div v-if="loading" class="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <div class="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
    </div>

    <!-- Blog Posts -->
    <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
          {{ $t('readMore') }} →
        </NuxtLink>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 mt-6">
      <span>Error loading posts: {{ error.message }}</span>
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
import { ref, computed, onMounted } from 'vue';
import { useFetch } from '#app'; // Importing useFetch
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue';

const searchQuery = ref(""); // Track the search query
const currentPage = ref(1); // Track the current page number
const postsPerPage = 3; // Number of posts per page

// State variables for loading, error, and posts
const posts = ref([]);
const loading = ref(true); // Show loading indicator while fetching
const error = ref(null); // Store any potential error during fetch

// Fetch the posts from the static directory only once when the component is mounted
const { data, error: fetchError, pending } = useFetch('/api/posts'); // Fetch posts from static folder

onMounted(() => {
  // Reset loading state on mounted to prevent showing the loader when revisiting the page
  loading.value = pending.value;

  if (fetchError.value) {
    error.value = fetchError.value; // Handle error
    loading.value = false; // Stop loading if there's an error
  } else if (data.value) {
    posts.value = data.value; // Set the posts after data is fetched
    loading.value = false; // Hide the loading indicator after data is loaded
  }
});

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
  posts.value.filter(
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
