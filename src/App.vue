<script setup>
import HeaderTemp from './components/Header.vue'
import StoreFrontTemp from './components/StoreFrontTemp.vue'
import Footer from './components/Footer.vue'
import { reactive, provide } from 'vue';

const currencyState = reactive({
  selectedCurrency: '₪'
})
provide('currencyState', currencyState)
</script>

<template>
  <HeaderTemp />
  <StoreFrontTemp />
  <Footer />
</template>

<style scoped>
</style>
