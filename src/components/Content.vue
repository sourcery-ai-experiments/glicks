<template>
  <Filters @update:milk="handleMilkOptionsUpdate"
    @update:categories="handleCategoriesUpdate" />
  <div class="bg-[linear-gradient(0deg,_#ffffff_-18%,_#fffdfe_48%,_#f3bbbb_138%)]">
    <!-- Mobile menu -->
    <main>
      <!-- Hero section -->
      <div class="relative w-full py-12 px-12 bg-amber-950">
        <div class="relative z-10 text-center my-20 md:my-48">
          <h1 class="text-white text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-12">
            A taste you recognize
          </h1>
          <h2 class="text-white text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-12">
            With a Kashrus you trust
            <img />
          </h2>
        </div>
        <div class="relative mx-auto max-w-4xl flex justify-between text-white font-heading tracking-widest text-sm">
        </div>
        <img :src="mainImage" class="w-full h-full absolute inset-0 object-cover opacity-70">
      </div>

      <!-- Items listed by category or filter -->
      <div v-if="noItems" class="my-8 text-gray-600 text-3xl font-bold">
        <span>
          Sorry but we dont have that
        </span>
      </div>
      <div v-else-if="searching">
        <section aria-labelledby="items-listed">
          <div class="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
            <div class="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" class="text-4xl font-bold tracking-tight text-gray-700">
                This is what we found for you
              </h2>
            </div>
            <div 
              class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-x-0 justify-items-centerr">
              <ItemCards :items="displayResults" :itemCurrency="itemCurrency" @openModal="openModal" />
            </div>
          </div>
        </section>
      </div> 
      <div v-else>
        <div v-for="category in filteredCategories">
          <section v-if="getFilteredAndSortedItems(category.name).length > 0" aria-labelledby="items-listed"
            :id="`${category.name}`">
            <div class="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
              <div class="md:flex md:items-center md:justify-between">
                <h2 id="favorites-heading" class="text-4xl font-bold tracking-tight text-gray-700">
                  {{ category.name }}
                </h2>
              </div>
              <div
                class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-x-0 justify-items-center">
                <ItemCards :items="getFilteredAndSortedItems(category.name)" :itemCurrency="itemCurrency" 
                  @openModal="openModal" />
              </div>
            </div>
            <div v-if="getFilteredAndSortedItems(category.name, Infinity).length > 6" class="mt-4">
              <RouterLink :to="`/categories/category/${category.name.toLowerCase()}`"
                class="text-blue-600 hover:text-blue-800">
                View all {{ category.name }}
              </RouterLink>
            </div>
          </section>
        </div>
      </div>
      <Perks />
      <ItemDialog :isOpen="open" :item="selectedItem" :itemCurrency="itemCurrency" @update:isOpen="open = $event" />
    </main>
  </div>
</template>

<script setup>
import Filters from './Filters.vue';
import ItemCards from './ItemCards.vue';
import ItemDialog from './ItemDialog.vue';
import Perks from './Perks.vue';
import { ref, computed, watch, inject } from 'vue';
import itemsData from '@/assets/data/items.json';
import categoriesData from '@/assets/data/categories.json';
import mainImage from '@/assets/images/main_image.png';
import { RouterLink } from 'vue-router';

const items = ref(itemsData)
const categories = ref(categoriesData)

const currencyState = inject('currencyState', () => ('$'));

const itemCurrency = computed(() => currencyState.selectedCurrency);

const selectedCategories = ref([])
const selectedMilkOptions = ref("")
const searchResults = inject('searchResults');
const displayResults = ref([]);
const searching = ref(false);
const searchNoItems = ref(false);

function handleMilkOptionsUpdate(options) {
  selectedMilkOptions.value = options;
  console.log(selectedMilkOptions.value)
}

function handleCategoriesUpdate(categories) {
  selectedCategories.value = categories;
  if (selectedCategories.value.length > 0) {
    console.log(selectedCategories.value)
  }
}

watch(searchResults, (newVal) => {
  searching.value = true;
  if (newVal.length > 0) {
    // Iterate through all fuse results and extract items
    displayResults.value = newVal.map(result => result.item);
    console.log('Results: ', displayResults.value)
    searchNoItems.value = false;
    console.log('searchNoItems: ', searchNoItems.value);
    console.log('searching: ', searching.value);
  } else {
    searchNoItems.value = true;
  }
})

const filteredCategories = computed(() => {
  if (!categories.value) return [];
  // returns all categories if no categories are selected
  // and if categories are selected, returns only the selected categories
  return categories.value.filter(category => {
    if (selectedCategories.value.length > 0) {
      return selectedCategories.value.some(selectedCategory =>
        selectedCategory.name === category.name
      );
    } else {
      return true
    }
  })
})
function getFilteredAndSortedItems(category) {
  if (!items.value) return [];
  let itemsReturned = items.value.filter(item => {
    let matchesMilkCriteria = true;
    if (selectedMilkOptions.value === "Pareve") {
      matchesMilkCriteria = item.milk === false;
    } else if (selectedMilkOptions.value === "Milk") {
      matchesMilkCriteria = item.milk === true;
    }

    // Check if the item's category matches the current category
    let isInCategory = item.description.category.includes(category);

    return isInCategory && matchesMilkCriteria;
  });
  return itemsReturned.slice(0, 6);
}
/**
 * Checks if according to selected categories and filter there are no items
 * @requires filteredCategories
 * @requires getFilteredAndSortedItems
 * @returns boolean
 */
const noItems = computed(() => {
  if (!filteredCategories.value) return true;
  if (searchNoItems.value) {
    return true;
  }
  for (let category of filteredCategories.value) {
    let items = getFilteredAndSortedItems(category.name);
    if (items.length > 0) {
      return false;
    }
  }
  return true;
})

const open = ref(false)
const selectedItem = ref(null)

function openModal(item) {
  console.log('open')
  selectedItem.value = item
  open.value = true
}

</script>