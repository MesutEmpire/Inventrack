<template>
  <div class="flex lg:max-w-2xl mx-auto md:max-w-xl sm:max-w-lg p-7 lg:p-16 relative items-center justify-center">
    <div class="flex flex-col gap-y-5 p-4 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 w-full relative">
      <div class="flex justify-center text-2xl lg:text-4xl font-bold ">
        {{id ? "Update" : "Add"}} Inventory Item
      </div>
      <form @submit.prevent="id ? store.updateInventoryItem(id) : store.addNewInventoryItem()" class="flex flex-col gap-y-5">
        <div class="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-4 gap-y-3">
          <div class="relative  w-full relative ">
            <input
                type="text"
                id="name"
                v-model="store.inventoryForm.name"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="name"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name</label
            >
          </div>
          <div class="relative  w-full relative ">
            <input
                type="number"
                id="quantity"
                v-model="store.inventoryForm.quantity"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="quantity"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Quantity</label
            >
          </div>
        </div>
        <div class="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-4 gap-y-3">

        <div class="relative  w-full relative ">
            <select
                type="number"
                id="supplier"
                v-model="store.inventoryForm.supplier"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            >
              <option disabled selected>Choose a category</option>
              <option v-for="supplier in store.getSuppliers" :value="supplier.id">{{supplier.name}}f</option>
            </select>
            <label
                for="supplier"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Supplier</label
            >
          </div>
          <div class="relative  w-full relative ">
            <select
                type="number"
                id="category"
                v-model="store.inventoryForm.category"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            >
              <option disabled selected>Choose a category</option>
<!--              <option value="Men's Clothing">Men's Clothing</option>-->
<!--              <option value="Women's Clothing">Women's Clothing</option>-->
<!--              <option value="Electronics">Electronics</option>-->
<!--              <option value="Jewelry">Jewelry</option>-->

              <option v-for="category in store.getCategories" :value="category.id">{{category.name}}</option>
            </select>
            <label
                for="category"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Category</label
            >
          </div>
        </div>
        <div class="flex flex-row items-center flex-wrap md:flex-nowrap gap-x-4 gap-y-3">

        <div class="relative  w-full relative ">
            <input
                type="number"
                id="price"
                v-model="store.inventoryForm.price"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="price"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Price</label
            >
          </div>
        </div>

          <div class="relative  w-full relative ">
            <textarea
                type="text"
                rows="3"
                id="food_description"
                v-model="store.inventoryForm.description"
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
            />
            <label
                for="food_description"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Description</label
            >
          </div>
        <button
            type="submit"
            class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import {InventoryStore} from '@/stores/inventoryStore'
import {computed, watchEffect} from "vue";
import {useRoute} from "vue-router";
const store = InventoryStore()

const route = useRoute();

const suppliers = computed(() => store.getSuppliers);
const categories = computed(() => store.getCategories);

const id = parseInt(route.params?.id);

watchEffect(()=>{
  store.fetchCategories()
  store.fetchSuppliers()
  store.setInventoryForm(id);

})


</script>