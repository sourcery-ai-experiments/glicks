<template>
  <div class="grid-cols-1 grid-flow-row">
    <div class="items-center max-w-md mx-auto rounded-full sm:rounded-lg bg-gray-50 text-gray-500 flex">
      <input type="search" class="w-full px-4 py-1 bg-inherit text-gray-800 rounded-full focus:outline-none"
        placeholder="search" v-model="search"
        :title="(search.length > 0) ? 'Search all items' : 'Type something to enable search button'"
        @keyup.enter="search.length > 0 ? handleSearch() : null"  />
      <div>
        <button type="submit" @click="handleSearch"
          class="flex items-center justify-center w-12 h-10 sm:h-12 text-gray-500 rounded-r-full sm:rounded-r-lg rounded-l-none disabled:bg-gray-500"
          :class="(search.length > 0) ? 'bg-amber-200 hover:bg-amber-300' : 'bg-amber-100 hover:bg-amber-100 text-gray-300 disabled'"
          :title="(search.length > 0) ? 'Search' : 'Type something to enable the search button'">
          <div class=" w-36">
            <MagnifyingGlassIcon class="h-4 w-auto stroke-2" aria-hidden="true" />
          </div>
        </button>
      </div>
    </div>
    <span v-if="(search.length > 0)" class="text-gray-500 text-start ml-3 mt-0.5">
      search for: {{ search }}
    </span>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import items from '@/assets/data/items.json'
import Fuse from 'fuse.js'

const itemsData = ref(items)
const search = ref('')
const searchResults = inject('searchResults')

const handleSearch = async () => {
  const searchTerm = search.value.toLowerCase();

  // Define the search options
  const options = {
    keys: ['name'],
    threshold: 0.2,
    includeScore: true,
  };

  // Create a new Fuse instance
  const fuse = new Fuse(itemsData.value, options);

  // Perform the search
  const results = fuse.search(searchTerm).sort((a, b) => b.score - a.score);

  // log the results
  console.log('Search results: ', results);

  // Update the search results
  searchResults.value = results;
}
</script>