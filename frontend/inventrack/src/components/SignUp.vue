<template>
  <div class="flex lg:max-w-2xl mx-auto md:max-w-xl sm:max-w-lg p-7 lg:p-16 relative items-center justify-center">

    <div class="flex flex-col gap-y-5 p-4 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
      <div class="flex justify-center ">
        <img src="../assets/vue.svg" class="mr-3 h-16 lg:h-24 object-fill "
                                             alt="Inventrack Logo"></div>
      <div class="flex justify-center text-2xl lg:text-4xl font-bold ">
        Create Account
      </div>
      <form @submit.prevent="store.signUp()" @reset="resetForm" class="flex flex-col gap-y-5">
        <div class="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-4 gap-y-3">

          <div class="relative  w-full relative ">
            <input type="text" id="first_name" v-model="store.signInForm.first_name"
                   class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required />
            <label for="first_name"
                   class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              First Name</label>
          </div>


          <div class="relative  w-full relative">
            <input type="text" id="last_name" v-model="store.signInForm.last_name"
                   class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder=" " required />
            <label for="last_name"
                   class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Last Name</label>
          </div>
        </div>

        <div class="flex flex-row items-center flex-wrap md:flex-nowrap  gap-x-4 gap-y-3">

        <div class="relative w-full relative">
          <input type="tel" id="phone_number" v-model="store.signInForm.phone_number"
                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="phone_number"
                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Phone Number</label>
        </div>

        <div class="relative w-full relative">
          <input type="email" id="email" v-model="store.signInForm.email"
                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="email"
                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Email Address</label>
        </div>
        </div>

        <div class="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-4 gap-y-3">

        <div class="relative w-full relative">
          <input type="password" id="password" v-model="store.signInForm.password"
                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="password"
                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            New Password</label>
        </div>
        <div class="relative w-full relative">
          <input type="password" id="confirm_password" v-model="store.signInForm.confirm_password"

                 class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required />
          <label for="confirm_password"

                 class="absolute text-sm lg:text-base text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm
            Password</label>
        </div>
        </div>

        <button type="submit"
                class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>

        <div
            class="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-300"
        >
          Already have an account?
          <router-link
              to="/login"
              class="text-blue-400 hover:text-blue-700 hover:underline dark:text-blue-500"
          >Login
          </router-link>
        </div>

      </form>
    </div>
  </div>
  <div v-if="store.getAuthError">
    {{store.getAuthError}}
  </div>
</template>

<script setup lang="ts">
import {UserAuthStore} from "@/stores/userAuthStore";

    const store = UserAuthStore()

</script>

<style scoped>

</style>