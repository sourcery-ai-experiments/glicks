<script setup>
import HelloWorld from './components/HelloWorld.vue'
import HeaderTemp from './components/HeaderTemp.vue'
</script>

<template>
  <header class="test bg-pink-100">
    <HeaderTemp />
  </header>
  <div>
    <a href="" target="_self" class="test w-min">
      <img src="./assets/logo-y.png" class="rounded-full h-48 p-2" alt="Glicks logo" />
    </a>
  </div>
  <HelloWorld msg="Welcome to our deluxe menu!" />
</template>

<style scoped>
</style>
