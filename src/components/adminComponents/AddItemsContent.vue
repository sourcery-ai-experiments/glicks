<template>
  <!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
  <!-- New form code will be changed to add items form with option to add more than one item at a time -->
  <AddItemForm />
  <!-- Old form code logic will be transferred to new form -->
  <div class="space-y-10 divide-y divide-gray-900/10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div class="px-4 sm:px-0">
        <h2 class="text-base font-semibold leading-7 text-gray-900">New Category</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what
          you share.</p>
      </div>

      <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div class="px-4 py-6 sm:p-8">
          <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="website" class="block text-sm font-medium leading-6 text-gray-900">Category Name</label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input type="text" name="category-name" id="category-name" v-model="newCategoryName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Category name" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" @click="addCategories(newCategory, $event)"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
      <!-- insert removed form -->
    </div>
    <!-- insert removed -->
  </div>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { watch, ref } from 'vue';
import AddItemForm from './AddItemForm.vue';

const newCategoryName = ref('')
const newCategory = ref(
  {
    "name": newCategoryName
  })

async function addCategories(newCategories, event) {
  event.preventDefault()
  alert('AI 57 Post launched')
  try {
    alert('AI 59 Trying post.' + ' newCategories: ' + JSON.stringify(newCategories))
    const token = localStorage.getItem('token');
    const response = await fetch('/api/addCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'token'
      },
      body: JSON.stringify(newCategories)
    });
    if (!response.ok) {
      throw new Error('Failed to update categories: ' + response.statusText + ' ' + JSON.stringify(response));
    } else if (response.ok) {
      alert('You have successfully added ' + newCategoryName.value + ' to categories')
    }
    const result = await response.json();
    console.log(result)

  } catch (error) {
    console.log('Error: ', error)
  }
}

// watch for when newcategoryname changes

</script>
