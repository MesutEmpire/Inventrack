<template>
  <div class="layout">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import {watch, watchEffect} from "vue";
const route = useRoute()
const router = useRouter()

watchEffect(()=>{
  console.log(route.fullPath)
})

</script>
<style scoped>
</style>
