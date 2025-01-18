<template>
  <div class="relative max-w-md mx-auto">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="Search posts..."
      class="w-full p-4 pr-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <svg
      class="absolute right-4 top-4 h-6 w-6 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 16l-4-4m0 0l4-4m-4 4h16"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  searchQuery: { type: String, required: true },
});

const emit = defineEmits(["updateQuery"]);

const query = ref(props.searchQuery);

const onInput = () => {
  emit("updateQuery", query.value);
};
</script>
