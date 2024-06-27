<template>
  <div class="p-2 sm:p-0 bg-gray-100">
    <!-- Mobile filter button -->
    <div class="p-2 sm:hidden  flex justify-between gap-10">
      <Search class=" grid sm:hidden" />
      <button type="button"
        class="flex text-sm font-medium leading-6 h-fit text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-amber-100 active:bg-amber-200 sm:hidden"
        @click="toggleFiltersMobile">
        Filters
      </button>
    </div>
    <!-- Mobile filter dialog -->
    <TransitionRoot as="template" :show="filtersVisibleMobile">
      <Dialog class="relative z-40 sm:hidden">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="translate-x-full">
            <DialogPanel
              class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button"
                  class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  @click="toggleFiltersMobile">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Filters for small screen -->
              <form class="mt-4">
                <!-- Category filter -->
                <Disclosure as="div" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                      class="flex w-full items-center justify-between bg-white hover:bg-amber-100 active:bg-amber-200 px-2 py-3 text-sm text-gray-900">
                      <span class="font-medium text-gray-900">Categories</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div v-for="category in categories" :key="category.id" class="flex items-center">
                        <input :id="`category-${category.id}`" :name="`category-${category.id}`"
                          :value="category.checked" type="checkbox" :checked="category.checked"
                          v-model="category.checked" @click.stop
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`category-${category.id}`" class="ml-3 text-sm text-gray-500">
                          {{ category.name }}
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <!-- Milchig filter -->
                <Disclosure as="div" class="px-4 py-6" v-slot="{ open }">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                      class="flex w-full items-center justify-between bg-white hover:bg-amber-100 active:bg-amber-200 px-2 py-3 text-sm text-gray-900">
                      <span class="font-medium text-gray-900">Milk/Parve</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                          aria-hidden="true" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input :id="`${milkOptions[1].name}`" :name="`${milkOptions[1].name}`"
                          :value="`${milkOptions[1].name}`" type="checkbox" :checked="milkOptions[0].checked"
                          v-model="milkOptions[0].checked"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`${milkOptions[1].name}`"
                          class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">Milk</label>
                        <input :id="`${milkOptions[1].name}`" :name="`${milkOptions[1].name}`"
                          :value="`${milkOptions[1].name}`" type="checkbox" :checked="milkOptions[1].checked"
                          v-model="milkOptions[1].checked"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`${milkOptions[1].name}`"
                          class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ milkOptions[1].name
                          }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Filters for lg screens -->
    <!-- Toggle Button for filters for lg screens -->
    <button @click="toggleFilters" :class="['hidden sm:flex items-center justify-between w-full h-min leading-none bg-gray-100 hover:bg-amber-100 active:bg-amber-200',
      filtersVisible ? 'p-1' : 'p-2.5 xl:p-3']">
      <span v-if="filtersVisible" class="text-xs">Hide Filters</span>
      <span v-else>Filters</span>
      <ChevronDownIcon :class="{ 'transform rotate-180': filtersVisible }"
        class="h-5 w-5 text-gray-500 transition-transform mr-auto" aria-hidden="true" />
    </button>
    <section v-show="filtersVisible" aria-labelledby="filter-heading" class="hidden sm:block">
      <h2 id="filter-heading" class="sr-only">Filters</h2>
      <div class="border-b border-gray-200 bg-white p-3">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div class="hidden sm:block">
            <div class="flow-root">
              <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                <!-- Category filter lg screen -->
                <Popover class="relative inline-block px-4 text-left">
                  <PopoverButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-amber-100 active:bg-amber-200">
                    <span>Categories</span>
                    <span
                      class="ml-1.5 rounded-lg bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                      {{ amountCheckedCategories }}
                    </span>
                    <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true" />
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form class="space-y-4">
                        <div v-for="category in categories" :key="category.name" class="flex items-center">
                          <input :id="`category-${category.id}`" :name="category" :value="category.name" type="checkbox"
                            :checked="category.checked" v-model="category.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`category-${category.id}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ category.name
                            }}</label>
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
                <!-- Milk filter lg screen -->
                <Popover class="relative inline-block px-4 text-left">
                  <PopoverButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-amber-100 active:bg-amber-200">
                    <span>Milk/Parve</span>
                    <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true" />
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form class="space-y-4">
                        <div class="flex items-center">
                          <input :id="`${milkOptions[1].name}`" :name="`${milkOptions[1].name}`"
                            :value="`${milkOptions[1].name}`" type="checkbox" :checked="milkOptions[0].checked"
                            v-model="milkOptions[0].checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`${milkOptions[1].name}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">Milk</label>
                          <input :id="`${milkOptions[1].name}`" :name="`${milkOptions[1].name}`"
                            :value="`${milkOptions[1].name}`" type="checkbox" :checked="milkOptions[1].checked"
                            v-model="milkOptions[1].checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`${milkOptions[1].name}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ milkOptions[1].name
                            }}</label>
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </div>
        </div>
      </div>
      <!-- Active filters -->
      <div>
        <div
          :class="{ 'py-1': activeFilters == null, 'py-2': activeFilters != null, 'mx-auto': true, 'max-w-7xl': true, 'px-4': true, 'flex': true, 'items-center': true, 'justify-between': true, 'sm:px-6': true, 'lg:px-8': true }">
          <div class="flex justify-start items-center">
            <h3 class="text-sm font-medium text-gray-500">
              Filters
              <span class="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />
            <div class="mt-2 sm:ml-4 sm:mt-0 flex justify-between">
              <div class="-m-1 flex flex-wrap items-center">
                <span v-for="activeFilter in activeFilters" :key="activeFilter.name"
                  class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
                  <span>{{ activeFilter.name }}</span>
                  <button type="button" @click="removeFilter(activeFilter)" :value="activeFilter.name"
                    class="ml-1 inline-flex h-5 w-5 flex-shrink-0 rounded-full p-1 -mb-0.5 text-gray-600 hover:text-gray-700 bg-gray-200 hover:bg-amber-100 active:bg-amber-200">
                    <span class="sr-only">Remove filter for {{ activeFilter.name }}</span>
                    <svg class="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div>
            <button @click="removeFilter('clearAll')" v-if="activeFilters"
              class="bg-white hover:bg-amber-100 active:bg-amber-200">
              Clear all
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import Search from './Search.vue'
import categoriesData from '../assets/data/categories.json'

const categories = ref(categoriesData)
const milkOptions = ref([])

milkOptions.value = [
  {
    id: 1,
    name: "Milk",
    checked: false,
  },
  {
    id: 2,
    name: "Parve",
    checked: false,
  },
]

const checkedMilkOptions = computed(() => {
  if (milkOptions.value[0].checked && !milkOptions.value[1].checked) {
    return "Milk"
  } else if (milkOptions.value[1].checked && !milkOptions.value[0].checked) {
    return "Parve"
  } else {
    return "Both"
  }
})

const amountCheckedCategories = computed(() => {
  return categories.value.filter((category) => category.checked).length
})
const checkedCategories = computed(() => {
  return categories.value.filter((category) => category.checked)
})

const filtersVisible = ref(false)

function toggleFilters() {
  filtersVisible.value = !filtersVisible.value
}

const filtersVisibleMobile = ref(false);

function toggleFiltersMobile() {
  filtersVisibleMobile.value = !filtersVisibleMobile.value
}

const activeFilters = computed(() => {
  if (amountCheckedCategories.value > 0) {
    return checkedCategories.value
  } else if (checkedMilkOptions.value !== "Both") {
    return [
      {
        name: checkedMilkOptions.value,
        href: '#',
        current: false,
      },
    ]
  } else {
    return null
  }
})

function removeFilter(activeFilter) {
  if (activeFilter == 'clearAll') {
    categories.value.forEach((category) => {
      category.checked = false
    })
    milkOptions.value[0].checked = false
    milkOptions.value[1].checked = false
    return
  }
  switch (activeFilter.name) {
    case "Milk":
      milkOptions.value[0].checked = false
      break
    case "Parve":
      milkOptions.value[1].checked = false
      break;
    default:
      categories.value.forEach((category) => {
        if (category.name === activeFilter.name) {
          category.checked = false
        }
      })
  }
}

const emits = defineEmits(['update:categories', 'update:milk'])


watch(checkedMilkOptions, (newMilkOptions) => {
  console.log('Milk options changed to: ', newMilkOptions)
  emits('update:milk', newMilkOptions);
})

watch(checkedCategories, (newCategories) => {
  console.log('Categories changed. Now checked: ', newCategories)
  emits('update:categories', newCategories);
}, { deep: true });

</script>