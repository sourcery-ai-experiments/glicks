<template>
  <header class="test bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between py-1 px-6 lg:px-4 md:gap-x-4" aria-label="Global">
      <div class="flex items-center h-min md:gap-x-4 lg:gap-x-12">
        <Logo class="test min-w-min flex-shrink-0 pt-2 pb-2">
          <a href="#" class="-m-1.5 p-1.5 h-min flex">
            <span class="sr-only">Glicks Bakery</span>
            <img class="test h-20 md:h-28 lg:h-28 w-auto min-w-fit rounded-full" src="../assets/logo-y.png" alt="" />
          </a>
        </Logo>
        <div class="hidden md:flex gap-x-2 lg:gap-x-11">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            class="test text-base font-extrabold font-cherrySwashScript leading-6 h-min rounded-md py-4 md:px-1 px-2 text-gray-900 hover:bg-amber-100 hover:text-black flex-shrink-0">{{
              item.name }}</a>
        </div>
      </div>
      <div class="flex md:hidden">
        <button type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white bg-rose-300 hover:bg-rose-400 active:bg-rose-500"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden md:flex ">
        <a href="#"
          class="text-sm font-semibold leading-6 rounded-md py-2 px-3 text-gray-900 hover:text-gray-800 active:text-gray-900 bg-amber-100 hover:bg-amber-200 active:bg-amber-300">Log
          in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-14 w-auto rounded-full" src="/favicon/favicon-glicks.png" alt="" />
          </a>
          <button type="button"
            class="-m-2.5 rounded-md p-2.5 text-white bg-rose-300 hover:bg-rose-400 active:bg-rose-500 active:border-none"
            @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-amber-100 hover:text-black">{{
                  item.name }}</a>
            </div>
            <div class="py-6">
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-amber-100 hover:text-black">Log
                in</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Logo from './Logo.vue'
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Cakes', href: '#' },
  { name: 'Cookies', href: '#' },
  { name: 'Kedeishim', href: '#' },
  { name: 'Contact us', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>