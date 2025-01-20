<template>
  <header class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Blog Title -->
      <h1 class="text-xl font-bold tracking-wide">
        <NuxtLink to="/" class="hover:text-gray-200 transition"> {{ $t('myBlog') }} </NuxtLink>
      </h1>

      <!-- Navigation Links -->
      <nav class="flex items-center space-x-6">
        <!-- Contact Link -->
        <NuxtLink to="/contact" class="hover:text-gray-200 transition">
          {{ $t('contact') }} 
        </NuxtLink>

        <!-- Language Selector -->
        <div class="flex items-center space-x-4">
          <button
            v-for="localeOption in localesWithFlags"
            :key="localeOption.code"
            @click="switchLocale(localeOption.code)"
            class="flex items-center space-x-2 hover:text-gray-200 transition"
          >
            <img
              v-if="localeOption.flag"
              :src="localeOption.flag"
              :alt="localeOption.name"
              class="w-6 h-4"
            />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from '#imports'
// Use i18n for locale management
const { locale, availableLocales } = useI18n();

// Define language options with flags
const languageOptions = {
  en: { name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
  de: { name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
};

// Map available locales to language options
const localesWithFlags = availableLocales.map((code) => ({
  code,
  name: languageOptions[code]?.name || code,
  flag: languageOptions[code]?.flag || null,
}));

// Switch locale function
const switchLocale = (code) => {
  locale.value = code;
};
</script>
