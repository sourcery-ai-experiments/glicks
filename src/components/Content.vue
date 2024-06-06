<template>
  <Filters @update:sort="handleSortUpdate" @update:milk="handleMilkOptionsUpdate"
    @update:categories="handleCategoriesUpdate" />
  <div class="bg-[linear-gradient(0deg,_#ffffff_-18%,_#fffdfe_48%,_#f3bbbb_138%)]">
    <!-- Mobile menu -->
    <main>
      <!-- Hero section -->
      <div class="relative w-full py-12 px-12 bg-amber-950">
        <div class="relative z-10 text-center my-20 md:py-48">
          <h1 class="text-white text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-12">
            A taste you recognize</h1>
        </div>
        <div
          class="relative z-10 mx-auto max-w-4xl flex justify-between text-white font-heading tracking-widest text-sm">
        </div><img src="/images/main_image.png" class="w-full h-full absolute inset-0 object-cover opacity-70">
      </div>
      <!-- Items listed by category or filter -->
      <div v-for="category in categories">
        <section aria-labelledby="items-listed" :id="`${category.name}`" >
          <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:mt-32 lg:px-8 lg:mt-32 bg-inherit -pt-24">
            <div class="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" class="text-2xl font-bold tracking-tight text-gray-900">{{ category.name }}</h2>
            </div>
            <div
              class="mt-6 opacity-9 grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-0 justify-items-center">
              <div v-for="item in filteredAndSortedItems" :key="item.id"
                class="group relative bg-white w-5/6 rounded-lg shadow-md pb-3">
                <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 ">
                  <img :src="item.imageSrc" :alt="item.imageAlt" class="h-full w-full object-cover object-center" />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">
                  <a @click="openModal(item)" type="button">
                    <span class="absolute inset-0"></span>
                    {{ item.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm font-medium text-gray-900">{{ itemCurrency + item.price[itemCurrency] }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="perks-heading" class="border-t border-gray-200 bg-gray-50">
        <h2 id="perks-heading" class="sr-only">Our perks</h2>

        <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            <div v-for="perk in perks" :key="perk.name"
              class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div class="md:flex-shrink-0">
                <div class="flow-root">
                  <img class="-my-1 mx-auto h-24 w-auto" :src="perk.imageUrl" alt="" />
                </div>
              </div>
              <div class="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 class="text-base font-medium text-gray-900">{{ perk.name }}</h3>
                <p class="mt-3 text-sm text-gray-500">{{ perk.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ItemDialog :isOpen="open" :item="selectedItem" @update:isOpen="open = $event" />
    </main>


  </div>
</template>

<script setup>
import Filters from './Filters.vue';
import ItemDialog from './ItemDialog.vue';
import { ref, onMounted, computed, watch, inject } from 'vue'
import data from '../assets/data/database.json'

const items = ref({})
const categories = ref({})
onMounted(() => {
  items.value = data.items
  categories.value = data.categories
})


const currencyState = inject('currencyState', () => ('$'));

const itemCurrency = computed(() => currencyState.selectedCurrency);


const perks = ([
  {
    name: 'Same day delivery',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your items within hours.',
  },
  {
    name: 'All year discount',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'Connecting families around the world',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'We offer special attention and quality service to people from abroad ordering for their\
                    relatives in Jerusalem. Because we understand and care.',
  },
])

const selectedSort = ref({})
const selectedCategories = ref([])
const selectedMilkOptions = ref("")

function handleSortUpdate(option) {
  selectedSort.value = option;
}

function handleMilkOptionsUpdate(options) {
  selectedMilkOptions.value = options;
  console.log(selectedMilkOptions.value)
}

function handleCategoriesUpdate(categories) {
  selectedCategories.value = categories;
  console.log(selectedCategories.value[0])
}


const filteredAndSortedItems = computed(() => {
  if (!items.value) return [];

  return items.value.filter(item => {
    //Check if the item belongs to one of the selected categories
    let isInSelectedCategory = true;
    if (selectedCategories.value.length > 0) {
      isInSelectedCategory = selectedCategories.value.some(category =>
        item.description.categories.includes(category.name)
      );
    }

    let matchesMilkCriteria = true;
    if (selectedMilkOptions.value === "Milk") {
      matchesMilkCriteria = item.milk === true
    } else if (selectedMilkOptions === "Pareve") {
      matchesMilkCriteria === item.milk === false
    }
    return isInSelectedCategory && matchesMilkCriteria
  })
})

const open = ref(false)
const selectedItem = ref(null)

function openModal(item) {
  selectedItem.value = item
  open.value = true
}

</script>