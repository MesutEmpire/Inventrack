<template>
  <div>
    <!-- Display general fetch error if present -->
    <div v-if="fetchError" class="my-3 error_container">
      <p>{{ fetchError }}</p>
    </div>

    <!-- Page Not Found Error -->
    <main
        v-else
        class="grid min-h-screen place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">{{ status }}</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {{ statusText }}
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">{{ errorMessage }}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
              to="/"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
          >
            Go back home
          </router-link>
          <a href="#" class="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';
import {useRoute} from 'vue-router';

const props = defineProps({
  fetchError: String,
});

const route = useRoute();

// Simulate a "Not Found" error
const status = computed(() => 404);
const statusText = computed(() => 'Page Not Found');
const errorMessage = computed(() => `The requested URL "${route.path}" was not found.`);
</script>
