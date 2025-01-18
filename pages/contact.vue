<template>
  <form @submit.prevent="submitForm" class="space-y-6 max-w-lg mx-auto mt-10">
    <div>
      <label class="block text-gray-700 font-semibold">Name</label>
      <input
        v-model="name"
        type="text"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        placeholder="Your name"
      />
      <span v-if="errors.name" class="text-red-600 text-sm">{{ errors.name }}</span>
    </div>
    <div>
      <label class="block text-gray-700 font-semibold">Email</label>
      <input
        v-model="email"
        type="email"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        placeholder="Your email"
      />
      <span v-if="errors.email" class="text-red-600 text-sm">{{ errors.email }}</span>
    </div>
    <div>
      <label class="block text-gray-700 font-semibold">Message</label>
      <textarea
        v-model="message"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        placeholder="Your message"
      ></textarea>
      <span v-if="errors.message" class="text-red-600 text-sm">{{ errors.message }}</span>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const errors = reactive({});

const validate = () => {
  errors.name = !name.value ? "Name is required" : "";
  errors.email = !email.value ? "Email is required" : "";
  errors.message = !message.value ? "Message is required" : "";
  return !errors.name && !errors.email && !errors.message;
};

const submitForm = () => {
  if (validate()) {
    alert("Form submitted successfully!");
  }
};
</script>
