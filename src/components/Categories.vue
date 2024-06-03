<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="flex flex-col p-2 align-bottom">
    <h1 class="text-rose-800 mr-auto">Cakes</h1>
    <br>
    <p class="text-gray-700 mr-auto pl-5">
      Chocolate cake
    </p>
    <p class="text-gray-700 mr-auto pl-5">
      Brownie cake
    </p>
    <p class="text-gray-700 mr-auto pl-5">more cakes</p>
  </div>
</template>

<style scoped>
div {
  background-color: rgb(255, 236, 236);
}
.read-the-docs {
  color: #242424;
}
</style>
