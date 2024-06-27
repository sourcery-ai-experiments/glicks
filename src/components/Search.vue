<template>
  <div class="grid-cols-1 grid-flow-row">
    <div class="items-center max-w-md mx-auto rounded-full sm:rounded-lg bg-gray-50 text-gray-500 flex">
      <input type="search" class="w-full px-4 py-1 bg-inherit text-gray-800 rounded-full focus:outline-none"
        placeholder="search" v-model="search"
        :title="(search.length > 0) ? 'Search all items' : 'Type something to enable search button'">
      <div>
        <button type="submit" @click="handleSearch"
          class="flex items-center justify-center w-12 h-10 sm:h-12 text-gray-500 rounded-r-full sm:rounded-r-lg rounded-l-none disabled:bg-gray-500"
          :class="(search.length > 0) ? 'bg-amber-200 hover:bg-amber-300' : 'bg-amber-100 hover:bg-amber-100 text-gray-300 disabled'"
          :title="(search.length > 0) ? 'Search' : 'Type something to enable search button'">
          <div class=" w-36">
            <MagnifyingGlassIcon class="h-4 w-auto stroke-2" aria-hidden="true" />
          </div>
        </button>
      </div>
    </div>
    <span v-if="(search.length > 0)" class="text-gray-500 text-start ml-3 mt-0.5">search for: {{ search }}</span>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import items from '@/assets/data/items.json'
import levenshtein from 'fast-levenshtein'

const itemsData = ref(items)
const search = ref('')
const searchResults = inject('searchResults')
 
const handleSearch = async () => {
  const searchTerm = search.value.toLowerCase();
  const searchWords = searchTerm.split(' '); 
  const threshold = 2; // Define a threshold for the maximum allowable Levenshtein distance

  // Ensure items is an array
  if (!Array.isArray(items)) {
    console.error('Items is not an array');
    return [];
  }

  // First check for exact matches
  const exactMatches = items.filter(item => item.name.toLowerCase() == searchTerm);
  console.log('Exact matches: ', exactMatches.map(item => item.id))

  // Then check for items that their names include the search term
  const secondaryMatches = items.filter(item => item.name.toLowerCase().includes(searchTerm));
  console.log('Secondary matches: ', secondaryMatches.map(item => item.id))

  // Filter and sort the items based on their Levenshtein distance to the search term
  const fuzzyMatches = items
    .map(item => {
      const itemNameWords = item.name.toLowerCase().split(' ');
      const closestWord = itemNameWords.find(word => levenshtein.get(word, searchTerm) <= threshold);
      return {
        ...item,
        closestWord
      };
    })
    .filter(item => item.closestWord) // Filter out items with no close word match
    .sort((a, b) => levenshtein.get(a.closestWord, searchTerm) - levenshtein.get(b.closestWord, searchTerm)); // Sort items by their closest word distance

  console.log('Fuzzy matches: ', fuzzyMatches.map(item => item.id))
  // Use a Map to ensure uniqueness by item ID





  const uniqueMatchesMap = new Set();

  exactMatches.forEach(item => uniqueMatchesMap.add(item.id));
  secondaryMatches.forEach(item => uniqueMatchesMap.add(item.id));
  fuzzyMatches.forEach(item => uniqueMatchesMap.add(item.id));
  // Set a thing that keep track of each id what match it is
  const matchMap = new Map();
  exactMatches.forEach(item => matchMap.set(item.id, 'exact'));
  secondaryMatches.forEach(item => matchMap.set(item.id,'secondary'));
  fuzzyMatches.forEach(item => matchMap.set(item.id, 'fuzzy'));

  // Extract the unique items from the Map
  const uniqueMatches = Array.from(uniqueMatchesMap.values());

  // Create a results object that contains the match types and the items
  const results = {
    unique: uniqueMatches,
    matchType: matchMap
  }

  console.log(results);
  // Update the searchResults
  searchResults.value = results;
}

const emits = defineEmits(['update:search'])

</script>