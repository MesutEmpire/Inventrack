import { defineStore } from 'pinia'
import { UserAuthStore } from "@/stores/userAuthStore.js";
import {computed, reactive, ref} from "vue";
import Cookies from "js-cookie";
import router from "@/router/index.js";

export const InventoryStore = defineStore('inventory', ()=>{
  // STATE
  const inventoryItems = ref([])
  const inventoryForm = reactive({
    name: null,
    quantity: null,
    supplier: null,
    category: null,
    description: null,
    price: null,

  } )
  const searchedInventory = ref('')
  const foundSearchedInventory = ref(null)
  const deleteMultipleItems = ref([])
  const suppliers = ref([])
  const categories = ref([])
  const showModal = ref(false)
  const modelId = ref(null)

  //GETTERS
  const getInventory = computed(()=> {
    if (searchedInventory.value !== '') {
      searchInventory()
      return foundSearchedInventory.value
    }
    else {
      return inventoryItems.value
    }
  })
  const getNumberOfItems = computed(()=>inventoryItems.length)
  const getDashboardItems= computed(()=> [ {title:'Users',no : getNumberOfItems, colour: 'bg-red-600', abbr:'US'},
      {title:'New Inventory',no : getNumberOfItems, colour: 'bg-green-600', abbr:'NP'},
      {title:'Orders',no : 0, colour: 'bg-orange-600', abbr:'OR'}]
  )
  const getSuppliers = computed(()=> suppliers.value)
  const getCategories = computed(()=> categories.value)
  const getShowModal = computed(()=> showModal.value)
  const getModalId = computed(()=> modelId.value)

  //ACTIONS
    const fetchInventory = async () => {
      try {
        const token = Cookies.get('access_token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const {data} = await response.json();
        inventoryItems.value = data;
        console.log("Fetched inventory:", inventoryItems.value);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }

  const fetchSuppliers = async () => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/suppliers`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const {data} = await response.json();
      suppliers.value = data;
      console.log("Fetched supplier:", suppliers.value);
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  }

  const fetchCategories = async () => {
    try {
      const token = Cookies.get('access_token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const {data} = await response.json();

      categories.value = data;
      console.log("Fetched categories:", categories.value);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

    const addNewInventoryItem = async () =>  {
      console.log("Adding Inventory Item:", inventoryForm);

      try {
        const token = Cookies.get('access_token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
              'Authorization': `Bearer ${token}`},
          body: JSON.stringify(inventoryForm),
        });

        const res = await response.json();

        if (!response.ok) {
          throw new Error(res.message || `HTTP Error: ${response.status}`);
        }

        if (!res.status) {
          throw new Error(res.message || "Unknown error occurred");
        }
        console.log("Added Inventory Item:", res);
        await fetchInventory(); // Refresh inventory after adding
        resetInventoryForm()
        await router.push('/products')
      } catch (error) {
        console.error("Error adding inventory item:", error);
      }
    }

  const updateInventoryItem = async (id) =>  {
    console.log("Update Inventory Item:", inventoryForm);

    try {
      const token = Cookies.get('access_token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}`},
        body: JSON.stringify(inventoryForm),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || `HTTP Error: ${response.status}`);
      }

      if (!res.status) {
        throw new Error(res.message || "Unknown error occurred");
      }
      console.log("Updated Inventory Item:", res);
      await fetchInventory();
      resetInventoryForm()
      await router.push('/products')
    } catch (error) {
      console.error("Error updating inventory item:", error);
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
        const token = Cookies.get('access_token');
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${itemId}/`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
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

          const token = Cookies.get('access_token');
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
            body: JSON.stringify({ "ids":itemIds}),
          });
          await fetchInventory(); // Refresh inventory after deletion
        } catch (error) {
          console.error("Error deleting multiple inventory items:", error);
        }
      }
    }

    const toggleShowModal= (id= null)=>{
    showModal.value =  id ? !showModal.value : false
    modelId.value = id
  }

    const resetInventoryForm = ()=>{
      inventoryForm.name= null
      inventoryForm.quantity= null
      inventoryForm.supplier= null
      inventoryForm.category= null
      inventoryForm.description= null
      inventoryForm.price= null
    }

    const setInventoryForm = (id)=>{
      if(id){
        console.log(id)

        let found_item = inventoryItems.value.find((item) => item.id === id)
        if (found_item) {
          inventoryForm.name= found_item.name
          inventoryForm.quantity= found_item.quantity
          inventoryForm.supplier= found_item.supplier
          inventoryForm.category= found_item.category
          inventoryForm.description= found_item.description
          inventoryForm.price= found_item.price
        }

      }
  }


  return {
    inventoryItems,inventoryForm,searchedInventory,foundSearchedInventory,deleteMultipleItems,suppliers,categories,showModal,modelId,getInventory,getNumberOfItems,getDashboardItems,getSuppliers,getCategories,getShowModal,getModalId,
    fetchInventory,addNewInventoryItem,searchInventory,deleteInventoryItem,deleteMultipleInventoryItems,fetchSuppliers,fetchCategories,resetInventoryForm,toggleShowModal,setInventoryForm,updateInventoryItem

  }
});
