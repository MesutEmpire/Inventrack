import { defineStore } from 'pinia'
import { UserAuthStore } from "@/stores/userAuthStore.js";
import {computed, reactive, ref} from "vue";

export const InventoryStore = defineStore('inventory', ()=>{
  // STATE
  const inventoryItems = ref([])
  const inventoryForm = reactive({
    name: null,
    quantity: null,
    supplier: null,
    category: null,
    description: null,
    purchase_price: null,
    selling_price: null,
  } )
  const   searchedInventory = ref('')
  const foundSearchedInventory = ref(null)
  const deleteMultipleItems = ref([])

  //GETTERS
  const getInventory = computed(()=> foundSearchedInventory ?? inventoryItems)
  const getNumberOfItems = computed(()=>inventoryItems.length)
  const getDashboardItems= computed(()=> [ {title:'Users',no : getNumberOfItems, colour: 'bg-red-600', abbr:'US'},
      {title:'New Inventory',no : getNumberOfItems, colour: 'bg-green-600', abbr:'NP'},
      {title:'Orders',no : 0, colour: 'bg-orange-600', abbr:'OR'}]
  )

  //ACTIONS
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`);
        const data = await response.json();
        inventoryItems.value = data;
        console.log("Fetched inventory:", inventoryItems.value);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }

    const addNewInventoryItem = async () =>  {
      const userAuth = UserAuthStore();
      inventoryForm.supplier = userAuth.getCurrentUser.fullName;

      console.log("Adding Inventory Item:", inventoryForm);

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(inventoryForm),
        });

        const data = await response.json();
        console.log("Added Inventory Item:", data);
        await fetchInventory(); // Refresh inventory after adding
      } catch (error) {
        console.error("Error adding inventory item:", error);
      }
    }

    const searchInventory= () =>  {
      if (searchedInventory.value) {
        foundSearchedInventory.value = inventoryItems.value.filter((item) =>
            item.name.toLowerCase().includes(searchedInventory.value.toLowerCase())
        );
      }
    }

    const deleteInventoryItem = async (itemId) => {
      console.log("Deleting Inventory Item:", itemId);
      try {
        await fetch(`http://localhost:4000/api/inventory/${itemId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        await fetchInventory(); // Refresh inventory after deletion
      } catch (error) {
        console.error("Error deleting inventory item:", error);
      }
    }

    const deleteMultipleInventoryItems = async (itemIds) => {
      console.log("Deleting Multiple Inventory Items:", itemIds);
      if (itemIds.length > 0) {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory/deleteMultiple`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(itemIds),
          });
          await fetchInventory(); // Refresh inventory after deletion
        } catch (error) {
          console.error("Error deleting multiple inventory items:", error);
        }
      }
    }


  return {
    inventoryItems,inventoryForm,searchedInventory,foundSearchedInventory,deleteMultipleItems,getInventory,getNumberOfItems,getDashboardItems,
    fetchInventory,addNewInventoryItem,searchInventory,deleteInventoryItem,deleteMultipleInventoryItems

  }
});
