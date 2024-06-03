<template>
  <header class="bg-white">
    <nav class="flex items-center justify-between py-3 px-4 lg:px-6" aria-label="Main navigation">
      <Logo class="min-w-min flex-shrink-0 p-2 md:p-4 -mr-24">
        <a href="#" class="-m-1.5 p-1.5 h-min flex items-center">
          <span class="sr-only">Glicks Bakery</span>
          <img class="h-20 md:h-28 lg:h-28 w-auto min-w-fit rounded-full" src="../assets/logo-y.png" alt="Glicks Bakery" />
          <span class="flex md:hidden ml-2 text-amber-700 text-2xl font-cherrySwashScript">Glicks Bakery</span>
        </a>
      </Logo>
      <div class="hidden md:flex gap-x-6 lg:gap-x-12 justify-between mx-auto">
        <a v-for="item in navigation" :key="item.name" :href="item.href"
          class="text-xl lg:text-2xl font-extrabold font-cherrySwashScript leading-6 h-min rounded-md py-3 px-2 lg:px-3 text-gray-900 hover:bg-amber-100 hover:text-black flex-shrink-0">{{
            item.name }}</a>
      </div>
      <div class="flex">
        <button type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white bg-rose-300 hover:bg-rose-400 active:bg-rose-500"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog @close="mobileMenuOpen = false" :open="mobileMenuOpen">
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
            <div class="space-y-2 py-6">
              <a href="#contact-us" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-green-200 hover:text-black">
                Contact Us
              </a>
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
  { name: 'Cakes', href: '#cakes' },
  { name: 'Cookies', href: '#cookies' },
  { name: 'Kedeishim', href: '#kedeishim' },
  { name: 'Specials', href: '#special' },
]

const mobileMenuOpen = ref(false)
</script>