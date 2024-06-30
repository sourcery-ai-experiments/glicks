<template>
  <div class="relative w-full px-12 flex items-center justify-center"
    :class="categoryImageSrc === '' ? 'bg-rose-200 h-40' : 'bg-yellow-950 py-12'">
    <div class="relative z-10 text-center w-full"
    :class="categoryImageSrc === '' ? 'my-0' :'my-20 md:my48'">
      <h1 class="text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold"
        :class="categoryImageSrc === '' ? 'text-gray-700 bg-white py-2 px-3 rounded-lg' :'text-white'">
        {{ categoryName  }}
      </h1>
    </div>
    <div v-if="categoryImageSrc !== ''" class="relative mx-auto max-w-4xl flex justify-between text-white font-heading tracking-widest text-sm">
    </div>
    <img v-if="categoryImageSrc !== ''" :src="mainImage" class="w-full h-full absolute inset-0 object-cover opacity-70">
  </div>
  <div v-if="noItems" class="my-8 font-bold">
    <span class="text-gray-600 text-3xl">
      Sorry but we can't find anything for "{{ categoryName }}"
    </span>
  </div>
  <div v-else>
    <div class="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
      <div
        class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-x-0 justify-items-centerr">
        <ItemCards :items="categoryItems" :itemCurrency="itemCurrency" @openModal="openModal" />
      </div>
    </div>
    <ItemDialog :isOpen="open" :item="selectedItem" :itemCurrency="itemCurrency" @update:isOpen="open = $event" />
  </div>
</template>

<script setup>
import { computed, inject, ref  } from 'vue';
import { useRoute } from 'vue-router';
import itemsData from '@/assets/data/items.json';
import categoriesData from '@/assets/data/categories.json';
import ItemDialog from './ItemDialog.vue';
import ItemCards from './ItemCards.vue';

const categoryImageSrc = computed(() => {
  const category = categoriesData.find(category => category.name === categoryName.value);
  return category ? category.imageSrc : '';
});

const mainImage = computed(() => {
  if (categoryImageSrc.value) {
    return new URL(`../assets/images/${categoryImageSrc.value}`, import.meta.url).href;
  }
  return '';
});

const route = useRoute();
const categoryName = computed(() => {
  const name = route.params.categoryName;
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const categoryItems = computed(() => {
  const filteredItems = itemsData.filter(item => item.description.category === categoryName.value);
  return filteredItems.length > 0 ? filteredItems : [];
});
const noItems = computed(() => categoryItems.value.length === 0);

const currencyState = inject('currencyState', () => ('$'));

const itemCurrency = computed(() => currencyState.selectedCurrency);

const open = ref(false)
const selectedItem = ref(null)

function openModal(item) {
  selectedItem.value = item
  open.value = true
}
</script>