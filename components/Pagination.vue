<template>
  <div class="flex justify-center items-center space-x-4 mt-6">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('changePage', page)"
      :class="[
        'px-4 py-2 rounded-lg shadow',
        page === currentPage
          ? 'bg-blue-600 text-white font-bold'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 3 },
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
</script>
