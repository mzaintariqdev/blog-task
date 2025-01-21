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
        <p class="mt-2 text-gray-600">
    {{ post.content.substring(0, 20) }} 
    <span v-if="post.content.length > 20">...</span>
  </p>
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
import { useFetch } from '#app';
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue';

const searchQuery = ref("");
const currentPage = ref(1);
const postsPerPage = 3;

const posts = ref([]);
const loading = ref(true); 
const error = ref(null); 

const { data, error: fetchError, pending } = useFetch('/api/posts'); 

onMounted(() => {
  loading.value = pending.value;

  if (fetchError.value) {
    error.value = fetchError.value; 
    loading.value = false;
  } else if (data.value) {
    posts.value = data.value; 
    loading.value = false; 
  }
});

const updateQuery = (query) => {
  searchQuery.value = query;

  const totalFilteredPages = Math.ceil(filteredPosts.value.length / postsPerPage);
  if (currentPage.value > totalFilteredPages) {
    currentPage.value = totalFilteredPages || 1; 
  }
};

// Filter posts based on the search query for both title and content
const filteredPosts = computed(() =>
  posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredPosts.value.slice(start, start + postsPerPage);
});

const setPage = (page) => {
  currentPage.value = page;
};
</script>
