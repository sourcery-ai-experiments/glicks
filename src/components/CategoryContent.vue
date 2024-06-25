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
    <img v-if="categoryImageSrc !== ''" :src="`/src/assets/images/${categoryImageSrc}`" class="w-full h-full absolute inset-0 object-cover opacity-70">
  </div>
  <div v-if="noItems" class="my-8 font-bold">
    <span class="text-gray-600 text-3xl">
      Sorry but we can't find any {{ categoryName }}
    </span>
  </div>
  <div v-else>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:mt-12 lg:px-8 lg:mt-12 bg-inherit -pt-24">
      <div
        class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-0 justify-items-center">
        <div v-for="item in categoryItems" :key="item.id"
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
    <ItemDialog :isOpen="open" :item="selectedItem" :itemCurrency="itemCurrency" @update:isOpen="open = $event" />
  </div>
</template>

<script setup>
import { computed, inject, ref  } from 'vue';
import { useRoute } from 'vue-router';
import itemsData from '@/assets/data/items.json';
import categoriesData from '@/assets/data/categories.json';
import ItemDialog from './ItemDialog.vue';

const categoryImageSrc = computed(() => {
  const category = categoriesData.find(category => category.name === categoryName.value);
  return category ? category.imageSrc : '';
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