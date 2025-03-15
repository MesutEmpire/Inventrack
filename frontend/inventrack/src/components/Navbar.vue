
<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded z-10">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link to="/" class="flex items-center">
        <img src="../assets/vue.svg" class="mr-3 h-14 sm:h-16" alt="Flowbite Logo">
        <span class="self-center text-3xl font-semibold whitespace-nowrap">Inventrack</span>
      </router-link>
      <div class="flex items-center md:order-2">
        <div v-if="!currentUser">
          <router-link to="/login">
            <button type="submit"
                    class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center ">Log In</button>

          </router-link>
        </div>

        <div v-if="currentUser">
      <span class="font-medium px-2" >    Hello
        {{currentUser.first_name}} </span>
          <button type="submit" @click="store.logOut()"
                  class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center ">Log Out</button>

        </div>
      </div>
    </div>
  </nav>

</template>

<script setup>
import {UserAuthStore} from "@/stores/userAuthStore";
import {computed} from "vue";
const store = UserAuthStore()

const currentUser = computed(() => store.getCurrentUser);

</script>

<style scoped>

</style>