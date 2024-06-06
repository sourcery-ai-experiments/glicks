<script setup>
import HeaderTemp from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import { reactive, provide } from 'vue';

const currencyState = reactive({
  selectedCurrency: '₪'
})
provide('currencyState', currencyState)
</script>

<template>
  <HeaderTemp />
  <Content />
  <Footer />
</template>

<style scoped>
</style>
