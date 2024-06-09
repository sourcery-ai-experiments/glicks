<template>
  <TransitionRoot :show="isOpen" as="template" v-if="isOpen">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-2 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 ">
                  <img :src="'/images/' + item.imageSrc" :alt="item.imageAlt"
                    class="h-full w-full object-cover object-center" />
                </div>
                <h3 class="mt-4 text-xl text-gray-700">
                  {{ item?.name }}
                </h3>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ item.description.text }}
                </p>
              </div>
              <div class="mt-4 flex items-center">
                <h4 class="text-amber-400">
                  Allergens:
                </h4>
                <p class="text-gray-600 ml-4 flex items-center justify-start" v-for="allergen in item.description.allergens">
                  {{ allergen }}
                </p>
              </div>
              <div class="flex item justify-center">
                <p class="mt-1 text-lg bg-amber-100 px-2 rounded-lg font-medium text-gray-900">
                  {{ itemCurrency + item.price[itemCurrency] }}
                </p>
              </div>
              <!-- Categories rendered as mini cards -->
              <div class="flex items-center justify-start">
                <p v-for="(category, index) in item.description.category" :key="index"
                  class="text-sm text-gray-500 bg-gray-300 w-min h-min px-1 py-0.5 m-2 rounded-md flex items-center">
                  {{ category }}
                </p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'

const props = defineProps({
  isOpen: Boolean,
  item: Object,
  itemCurrency: String,
});

onMounted(() => {
  console.log('ItemDialog received item: ', props.item)
});

const emit = defineEmits(['update:isOpen'])

function closeModal() {
  emit('update:isOpen', false)
}
</script>
