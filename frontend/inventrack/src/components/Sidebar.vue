<template>

  <div class="">
    <div
        class="w-auto max-w-auto"
    >
      <div class="px-2 py-2">
<!--        <span class="bg-gray-300 rounded-full w-8 h-8 text-2xl font-mono text-white">-->
<!--         {{store.getCurrentUser.fullName.charAt(0)}}-->
<!--        </span>-->
        <div v-if="store.getCurrentUser" class="flex flex-wrap items-center justify-center my-3">
          <span class="inline">
          <button type="button"
                  :class="color.state"
                  class="flex mr-3 text-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
<!--          <span class="sr-only">Open user menu</span>-->
            <!--          <img class="w-12 h-12 rounded-full" src="../assets/logo.png" alt="user photo" />-->
          <h4 class=" flex items-center justify-center w-14 h-14 text-2xl font-mono text-white">{{store.getCurrentUser.fullName.charAt(0)}}</h4>
        </button>
        </span>
          <span class="inline-block">
          <span class="block text-sm text-gray-90">{{store.getCurrentUser.fullName}}</span
          >
        <span class="block text-sm font-medium text-gray-500 truncate">{{store.getCurrentUser.email}}</span>
       </span>
        </div>
<!--        //{{ store.getUser.email }}-->
        <ul>
          <li class="my-px">
            <router-link key="dashboard" to="/dashboard/"
                class="borderTab flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-pink-100"
            >
              <span
                  class="flex items-center justify-center text-lg text-gray-400"
              >
                <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>

              </span>
              <span class="ml-3">Dashboard</span>

            </router-link>

          </li>
          <li class="my-px">
            <router-link key="users" to="/dashboard/products/"
                class="borderTab  flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-pink-100"
            >
              <span
                  class="flex items-center justify-center text-lg text-gray-400"
              >
                <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>

              </span>
              <span class="ml-3">Products</span>

            </router-link>
          </li>
          <li class="my-px">
            <router-link
                to="/"
                @click="store.logOut()"
                class="borderTab flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-pink-100"
            >
              <span
                  class="flex items-center justify-center text-lg text-red-400"
              >
                <svg
                    class="flex-shrink-0 w-6 h-6 text-red-500 transition duration-75 dark:text-red-500 group-hover:text-red-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  ></path>
                </svg>
              </span>
              <span class="ml-3">Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserAuthStore} from "@/stores/userAuthStore";
import {computed, reactive, ref} from "vue";
    const store = UserAuthStore()

const color = reactive({
  state: `${store.getCurrentUser?.color ?? 'bg-blue-700'}`
})
console.log(color.state)
</script>

<style scoped>
</style>