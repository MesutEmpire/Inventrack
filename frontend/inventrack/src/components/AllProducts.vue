<template>
  <div class="flex justify-end mt-5">
    <router-link to="/SuperUser/products/add-product">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bag-plus mr-10" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
      </svg>
    </router-link>
  </div>
  <div class="mr-10">
    <div class=" overflow-x-auto shadow-md sm:rounded-lg ">
      <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input v-model="store.searchedInventory" type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for Inventory">
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr >
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input  id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            Product Name
          </th>
          <th scope="col" class="px-6 py-3">
            Merchant
          </th>
          <th scope="col" class="px-6 py-3">
            Added On
          </th>
          <th scope="col" class="px-6 py-3">
            Product ID
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody >
        <tr v-for="product in store.getInventory" v-if="product" :key="product._id"  class="bg-white border-b">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input v-model="store.deleteMultipleItems" :value=product._id id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900">
            {{product.title}}
          </th>
          <td class="px-6 py-4" >
            {{product.merchant}}
          </td>
          <td class="px-6 py-4">
            {{product.createdAt}}
          </td>
          <td class="px-6 py-4">
            {{ product._id }}
          </td>
          <td class="px-6 py-4">
            {{ product.price }}
          </td>
          <!--          <td class=" text-right">-->
          <!--            &lt;!&ndash;           <a href="#" class="font-medium text-blue-600 dark:text-blue-500 ">Edit</a>&ndash;&gt;-->
          <!--            <button @click="store.showMakeAdmin(product._id)">-->
          <!--              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class=" w-10 h-10 p-2 hover:bg-white rounded-full" viewBox="0 0 16 16">-->
          <!--                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>-->
          <!--              </svg>-->
          <!--            </button>-->
          <!--            <div v-if="store.getUserSelected == product._id && store.getMakeAdmin " class="origin-top-right absolute right-3 w-44 md:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >-->
          <!--              <div class="flex justify-center text-center">-->
          <!--                <div class="px-2 py-2">-->
          <!--                  <ul>-->
          <!--                    &lt;!&ndash;            <li class="inline-block">&ndash;&gt;-->
          <!--                    &lt;!&ndash;              Make Admin&ndash;&gt;-->
          <!--                    &lt;!&ndash;            </li>&ndash;&gt;-->
          <!--                    &lt;!&ndash;            <li v-if="authStore.getUserAdmin"  @click="store.makeSuperUser(user.email)" class=" inline-block">&ndash;&gt;-->
          <!--                    &lt;!&ndash;              Make SuperUser&ndash;&gt;-->
          <!--                    &lt;!&ndash;            </li>&ndash;&gt;-->
          <!--                    <li  @click="store.makeUserAdmin({email:user.email,_id:user._id})"  class="my-px">-->
          <!--                      <a-->
          <!--                          href="#"-->
          <!--                          class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"-->
          <!--                      >-->
          <!--                        <span class="ml-3">Make Admin</span>-->
          <!--                      </a>-->
          <!--                    </li>-->
          <!--                    &lt;!&ndash;                    v-if="authStore.getUserSuper"&ndash;&gt;-->
          <!--                    <li   @click="store.makeSuperUser({email:user.email,_id:user._id})"  class="my-px">-->
          <!--                      <a-->
          <!--                          href="#"-->
          <!--                          class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"-->
          <!--                      >-->
          <!--                        <span class="ml-3">Make SuperUser</span>-->
          <!--                      </a>-->
          <!--                    </li>-->
          <!--                    <li   @click="store.deleteThisUser(user._id)"  class="my-px">-->
          <!--                      &lt;!&ndash;                      v-if="authStore.getUserSuper"&ndash;&gt;-->
          <!--                      <a-->
          <!--                          href="#"-->
          <!--                          class="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"-->
          <!--                      >-->
          <!--                        <span class="ml-3">Delete User</span>-->
          <!--                      </a>-->
          <!--                    </li>-->
          <!--                  </ul>-->
          <!--                  &lt;!&ndash;            <button @click="store.makeUserAdmin(user.email)" class="inline-block">Make Admin</button>&ndash;&gt;-->


          <!--                  &lt;!&ndash;            <button  v-if="authStore.getUserAdmin"  @click="store.makeSuperUser(user.email)" class=" inline-block">Make SuperUser</button>&ndash;&gt;-->

          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->

          <!--          </td>-->

        </tr>
        </tbody>
      </table>

    </div>
    <!--   v-if="store.deleteMultipleUsers.length > 0 "-->
    <button @click="store.deleteMultipleProduct(store.deleteMultipleInventory)" type="submit"
            class="my-8 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm lg:text-base w-full sm:w-auto px-5 py-2.5 text-center ">Delete Inventory</button>

  </div>
</template>

<script setup lang="ts">
import {InventoryStore} from '@/stores/inventoryStore'
import {watchEffect} from "vue";
const store = InventoryStore()
watchEffect(()=>{
  store.searchInventory()
})
</script>

<style scoped>

</style>