<template>
  <div class="bg-pink-300 h-96">
    <Navbar class="bg-pink-300"></Navbar>
    <div class=" bg-white my-14 mx-3 sm:mx-11 h-screen rounded sm:rounded-xl">
      <div class="grid grid-cols-6">
        <div class="border-r border-gray-300 "><Sidebar></Sidebar></div>
        <div class="col-span-5"> <router-view></router-view> </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

</script>

<style scoped>

</style>