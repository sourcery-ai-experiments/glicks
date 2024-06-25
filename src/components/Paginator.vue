<template>
  <div>
    <button @click="goToPrevPage" :disabled="currentPage === 1">Previous</button>
    <span v-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
    </span>
    <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, inject } from 'vue';
export default {
  props: {
    totalItems: Number,
    pageSize: Number,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    goToPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>