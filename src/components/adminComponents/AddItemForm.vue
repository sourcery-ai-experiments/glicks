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
<template>
    <form>
        <div class="space-x-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Add Items</h2>
                <!-- Add item form card -->
                <div class="grid grid-cols-1 w-full justify-items-center">

                    <div
                        class="m-10 p-6 grid grid-cols-2 gap-y-8 justify-items-start w-5/6 shadow-lg rounded-lg bg-gray-50">
                        <div class="border-r border-gray-300 pr-6">
                            <div class="sm:col-span-full justify-start w-full">
                                <span class="w-full flex justify-center my-2">
                                    <h3 class="text-gray-600 border-b border-gray-300 w-3/4">Item Name</h3>
                                </span>
                                <label for="username" class="flex pl-0.5 start-1 text-xs font-medium text-gray-900">
                                    Item Name
                                </label>
                                <div class="mt-1">
                                    <div
                                        class="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md bg-white">
                                        <span
                                            class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input type="text" name="username" id="username" autocomplete="username"
                                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                                            placeholder="Baked good" v-model="items[0].name" />
                                    </div>
                                </div>
                            </div>
                            <!-- Price input -->
                            <div class="sm:col-span-full justify-start w-full">
                                <span class="w-full flex justify-center my-2">
                                    <h3 class="text-gray-600 border-b border-gray-300 w-3/4">Prices</h3>
                                </span>
                                <div class="grid grid-cols-2 gap-5">
                                    <div>
                                        <label for="nis"
                                            class="block text-sm font-medium leading-6 text-gray-900">Shekel</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span class="text-gray-500 sm:text-sm">₪</span>
                                            </div>
                                            <input type="text" name="nis" id="nis"
                                                class="block bg-white w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                                placeholder="0.00" aria-describedby="nis-price" v-model="itemPrices[0]['₪']" />
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span class="text-gray-500 sm:text-sm" id="nis-price">NIS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="gbp"
                                            class="block text-sm font-medium leading-6 text-gray-900">Pound</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span class="text-gray-500 sm:text-sm">£</span>
                                            </div>
                                            <input type="text" name="gbp" id="gbp"
                                                class="block bg-white w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                                placeholder="0.00" aria-describedby="gbp-price" v-model="itemPrices[0]['£']" />
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span class="text-gray-500 sm:text-sm" id="gbp-price">GBP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="usd" class="block text-sm font-medium leading-6 text-gray-900">
                                            US Dollar
                                        </label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span class="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input type="text" name="usd" id="usd"
                                                class="block bg-white w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                                placeholder="0.00" aria-describedby="usd-price" v-model="itemPrices[0]['$']" />
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span class="text-gray-500 sm:text-sm" id="usd-price">USD</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="euro"
                                            class="block text-sm font-medium leading-6 text-gray-900">Euro</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                            <div
                                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span class="text-gray-500 sm:text-sm">€</span>
                                            </div>
                                            <input type="text" name="euro" id="euro"
                                                class="block bg-white w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="0.00" aria-describedby="euro-price" v-model="itemPrices[0]['€']" />
                                            <div
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span class="text-gray-500 sm:text-sm" id="euro-price">EUR</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Description section -->
                            <div class="w-full">
                                <!-- Long description input -->
                                <span class="w-full flex justify-center my-2">
                                    <h3 class="text-gray-600 border-b border-gray-300 w-3/4">Description</h3>
                                </span>
                                <label for="long-description" class="flex text-xs font-medium text-gray-900">
                                    Long description
                                </label>
                                <div class="mt-1 mb-4 h-32">
                                    <textarea id="about" name="about" rows="3"
                                        placeholder="Write a few sentences about the item." v-model="itemDescriptions[0].text"
                                        class="block w-full h-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 bg-white" />
                                </div>
                                <!-- Short description input -->
                                <label for="username" class="flex pl-0.5 start-1 text-xs font-medium text-gray-900">
                                    Short description
                                </label>
                                <div class="mt-1">
                                    <div
                                        class="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md bg-white">
                                        <span
                                            class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input type="text" name="username" id="username" autocomplete="username"
                                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                                            placeholder="Baked good" v-model="itemDescriptions[0].short_text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full pl-6">
                            <div class="w-full">
                                <!-- Allergen info -->
                                <span class="w-full flex justify-center my-2">
                                    <h3 class="text-gray-600 border-b border-gray-300 w-3/4">Continued</h3>
                                </span>
                                <h3 class="flex pl-1 mt-4 mb-1 font-semibold text-gray-900 text-xs">Allergens</h3>
                                <ul
                                    class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-3 custom-border">
                                    <li v-for="(allergen, index) in allergens" :key="allergen.name"
                                        :class="['w-full border-b border-gray-200', { 'border-none': index === allergens.length - 1 }]">
                                        <div class="flex items-center ps-3">
                                            <input :id="`${allergen.name}-checkbox`" type="checkbox" value="" v-model="allergen.checked"
                                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ">
                                            <label :for="`${allergen.name}-checkbox`"
                                                class="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                                                {{ allergen.name }}
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                <h3 class="flex pl-1 mt-4 mb-1 font-semibold text-gray-900 text-xs">Milk/Parave</h3>
                                <div class="grid grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2">
                                    <div>
                                        <input type="radio" name="option" id="milk" value="true" class="peer hidden"
                                            checked v-model="items[0].milk" />
                                        <label for="milk"
                                            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Milk</label>
                                    </div>

                                    <div>
                                        <input type="radio" name="option" id="parave" value="false"
                                            class="peer hidden" v-model="items[0].milk" />
                                        <label for="parave"
                                            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white">Parave</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Item photo input -->
                            <div class="w-full h-auto">
                                <span class="w-full flex justify-center my-2">
                                    <h3 class="text-gray-600 border-b border-gray-300 w-3/4">Photo</h3>
                                </span>
                                <label for="item-photo" class="flex text-xs font-medium text-gray-900">
                                    Item photo
                                </label>
                                <div
                                    class="mt-1 flex bg-white justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div class="text-center">
                                        <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label for="file-upload"
                                                class="relative cursor-pointer rounded-md bg-gray-100 hover:bg-amber-100 active:bg-amber-200 hover:text-gray-700 px-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file"
                                                    class="sr-only" />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Category selection -->
                            <div>
                                <fieldset>
                                    <legend class="text-sm font-semibold leading-6 text-gray-900">Category</legend>
                                    <p class="mt-1 text-sm leading-6 text-gray-600">
                                        Choose the category that best fits the item.
                                    </p>
                                    <div class="mt-6 space-y-6">
                                        <div v-for="category in categories"
                                            :key="category.id" class="flex items-center">
                                            <input :id="category.id" name="notification-method" type="radio"
                                                :checked="category.id === 'email'"
                                                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                            <label :for="category.id"
                                                class="ml-3 block text-sm font-medium leading-6 text-gray-900">{{
                                                category.name }}</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <!-- Add another item button -->
                    <div
                        class="m-10 p-6 grid grid-cols-1 w-5/6 justify-items-start shadow-lg rounded-lg bg-gray-50">
                        <button type="button"
                            class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <SquaresPlusIcon class="mx-auto h-16 w-16 text-gray-500" aria-hidden="true" />
                            <span class="mt-2 block text-sm font-semibold text-gray-900">
                                Add another item
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- END -->
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/solid';
import { SquaresPlusIcon } from '@heroicons/vue/24/outline';
import categoriesData from '@/assets/data/categories.json';
import allergensData from '@/assets/data/allergens.json';

const categories = ref(categoriesData);
const allergens = ref(allergensData);

const itemNames = ref([''])
const itemPrices = ref([{
    "$": null,
    "€": null,
    "£": null,
    "₪": null
}])
const itemImageSrcs = ref([''])
const itemImageAlts = ref([''])
const itemDescriptions = ref([{
    short_text: '',
    text: '',
    allergens: [],
    category: '',
}])
const itemMilks = ref([Boolean])
const items = ref([{
    "name": itemNames[0],
    "price": itemPrices[0],
    "imageSrc": itemImageSrcs[0],
    "imageAlt": itemImageAlts[0],
    "description": itemDescriptions[0],
    "milk": itemMilks[0],
}])

// When items is changed output new value to console
watchEffect(() => {
    console.log(itemNames.value[0]);
});

</script>

<style scoped>
.custom-border {
    position: relative;
}

.custom-border::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 50%;
    width: 0.5px;
    height: calc(100% - 20px);
    /* Adjust based on top and bottom */
    background-color: #e5e7eb;
    /* Tailwind's gray-200 */
    transform: translateX(-50%);
    pointer-events: none;
}

.custom-border li:nth-child(2n-1):nth-last-child(2) {
    border-bottom: none;
}
</style>
