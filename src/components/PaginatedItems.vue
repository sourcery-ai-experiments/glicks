<template>
  <div>
    <div class="grid grid-cols-1 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-0 justify-items-center">
      <div v-for="item in paginatedItems" :key="item.id" class="group relative bg-white w-5/6 rounded-lg shadow-md pb-3">
        <!-- Your item display code here -->
      </div>
    </div>
    <div class="mt-6 flex justify-between">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 6
  }
});

const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.items.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>
