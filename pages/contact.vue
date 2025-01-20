<template>
  <form @submit.prevent="submitForm" class="space-y-6 max-w-lg mx-auto mt-10">
    <div>
      <label class="block text-gray-700 font-semibold"> {{ $t('name') }} </label>
      <input
        v-model="name"
        type="text"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        :placeholder="$t('yourName')"
      />
      <span v-if="errors.name" class="text-red-600 text-sm">{{ $t(errors.name) }}</span>
    </div>
    <div>
      <label class="block text-gray-700 font-semibold"> {{ $t('email') }} </label>
      <input
        v-model="email"
        type="email"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        :placeholder="$t('yourEmail')"
      />
      <span v-if="errors.email" class="text-red-600 text-sm">{{ $t(errors.email) }}</span>
    </div>
    <div>
      <label class="block text-gray-700 font-semibold"> {{ $t('message') }} </label>
      <textarea
        v-model="message"
        class="w-full p-4 border rounded-lg shadow focus:ring-2 focus:ring-blue-500"
        :placeholder="$t('yourMessage')"
      ></textarea>
      <span v-if="errors.message" class="text-red-600 text-sm">{{ $t(errors.message) }}</span>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 transition"
    >
    {{ $t('submit') }} 
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const errors = reactive({});

// Regular expression to validate email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = () => {
  errors.name = !name.value ? "nameIsRequired" : "";
  errors.email = !email.value
    ? "emailIsRequired"
    : !emailRegex.test(email.value)
    ? "pleaseEnteraValidEmailAddress"
    : "";
  errors.message = !message.value ? "messageIsRequired" : "";

  // Return true if all fields are valid
  return !errors.name && !errors.email && !errors.message;
};

const submitForm = () => {
  if (validate()) {
    alert($t('formSubmittedSuccessfully'));
    // Reset form fields after successful submission
    name.value = "";
    email.value = "";
    message.value = "";
  }
};
</script>
