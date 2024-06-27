<template>
  <Filters @update:sort="handleSortUpdate" @update:milk="handleMilkOptionsUpdate"
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
            with a Kashrus you trust
            <img />
          </h2>
        </div>
        <div class="relative mx-auto max-w-4xl flex justify-between text-white font-heading tracking-widest text-sm">
        </div><img :src="mainImage" class="w-full h-full absolute inset-0 object-cover opacity-70">
      </div>

      <!-- Items listed by category or filter -->
      <div v-if="noItems" class="my-8 text-gray-600 text-3xl font-bold">
        <span>
          Sorry but we dont have that
        </span>
      </div>
      <div v-else-if="searching">
        <section aria-labelledby="items-listed">
          <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
            <div class="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" class="text-4xl font-bold tracking-tight text-gray-700">
                This is what we found for you
              </h2>
            </div>
            <div
              class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-0 justify-items-center">
              <div v-for="item in displayResults" :key="item.id"
                class="group relative bg-white w-5/6 rounded-lg shadow-md pb-3">
                <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 ">
                  <img :src="'/images/' + item.imageSrc" :alt="item.imageAlt"
                    class="h-full w-full object-cover object-center" />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">
                  <a @click="openModal(item)" type="button">
                    <span class="absolute inset-0"></span>
                    {{ item.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{ itemCurrency + item.price[itemCurrency] }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div> 
      <div v-else>
        <div v-for="category in filteredCategories">
          <section v-if="getFilteredAndSortedItems(category.name).length > 0" aria-labelledby="items-listed"
            :id="`${category.name}`">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
              <div class="md:flex md:items-center md:justify-between">
                <h2 id="favorites-heading" class="text-4xl font-bold tracking-tight text-gray-700">{{
                  category.name }}
                </h2>
              </div>
              <div
                class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-0 justify-items-center">
                <div v-for="item in getFilteredAndSortedItems(category.name)" :key="item.id"
                  class="group relative bg-white w-5/6 rounded-lg shadow-md pb-3">
                  <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 ">
                    <img :src="'/images/' + item.imageSrc" :alt="item.imageAlt"
                      class="h-full w-full object-cover object-center" />
                  </div>
                  <h3 class="mt-4 text-sm text-gray-700">
                    <a @click="openModal(item)" type="button">
                      <span class="absolute inset-0"></span>
                      {{ item.name }}
                    </a>
                  </h3>
                  <p class="mt-1 text-sm font-medium text-gray-900">
                    {{ itemCurrency + item.price[itemCurrency] }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="getFilteredAndSortedItems(category.name, Infinity).length > 2" class="mt-4">
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
import ItemDialog from './ItemDialog.vue';
import Perks from './Perks.vue';
import { ref, computed, watch, inject } from 'vue';
import itemsData from '../assets/data/items.json';
import categoriesData from '@/assets/data/categories.json';
import mainImage from '@/assets/images/main_image.png';
import { RouterLink } from 'vue-router';

const items = ref(itemsData)
const categories = ref(categoriesData)

const currencyState = inject('currencyState', () => ('$'));

const itemCurrency = computed(() => currencyState.selectedCurrency);

const selectedSort = ref({})
const selectedCategories = ref([])
const selectedMilkOptions = ref("")
const searchResults = inject('searchResults');
const displayResults = ref([])
const searching = ref(false)
const searchNoItems = ref(false)
function handleSortUpdate(option) {
  selectedSort.value = option;
}

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

function handleSearch(search) {
  if (!items.value) return [];
  // return all items that id equals one of search.unique
  // Sort the items according to search.matchType 'exact', 'secondary', 'fuzzy'
  results.sort((a, b) => {
    if (search.matchType === 'exact') {
      return a.name.localeCompare(b.name);
    } else if (search.matchType === 'secondary') {
      return a.secondaryName.localeCompare(b.secondaryName);
    } else if (search.matchType === 'fuzzy') {
      return a.name.localeCompare(b.name);
    }
  });
  searching.value = true;
  searchResults.value = results;
}

watch(searchResults, (newVal) => {
  searching.value = true;
  console.log(newVal)
  if (newVal && newVal.unique.length > 0) {
    console.log(newVal)
    const results = items.value.filter(item => newVal.unique.includes(item.id));
    // Logic for sort shall be implemented
    // Log all names
    console.log(results.forEach(item => item.name))
    displayResults.value = results;
  } else {
    console.log(newVal)
    searchNoItems.value = true;
    console.log('searchNoItems: ', searchNoItems.value)
    console.log('noItems: ', noItems.value)
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
function getFilteredAndSortedItems(category, limit = 2) {
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
  return itemsReturned.slice(0, limit);
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
  selectedItem.value = item
  open.value = true
}

</script>