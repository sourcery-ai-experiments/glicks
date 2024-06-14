<template>
  <header class="bg-white">
    <!-- Banner on top of nav that has location and contact info -->
    <div class="bg-gradient-to-r from-rose-400 to-rose-600 h-min">
      <span class=" flex md:flex items-center justify-between px-4 py-1 text-sm font-medium text-white">
        <p class="hidden sm:flex items-center justify-start">
          <a href="tel:+025373737" class="text-white hover:fill-white flex items-center">
            <PhoneIcon class="fill-white stroke-gray-50 w-3 hidden md:block" /><span class="text-white">&nbsp; IL:
              025-373737 &nbsp;</span>
          </a>
          <a href="tel:+44 20 7123 4567" class="hidden md:block text-white"><span class="text-white">&nbsp; UK: +44 20
              7123 4567 &nbsp;</span></a>
          <a href="tel:(555) 555-1234" class="text-white hidden lg:block"><span class="text-white">&nbsp; US: (555)
              555-1234</span></a>
        </p>
        <p>
          <span>
            <span class="text-white flex items-center">
              <TruckIcon class="w-5 stroke-2" /><span class="text-white text-xs sm:text-sm">&nbsp; We
                deliver to all areas in <span class=" text-amber-200">Yerushalayim.</span></span>
            </span>
          </span>
        </p>
      </span>
    </div>
    <nav class="flex items-center md:gap-10 justify-between py-2 lg:py-3 pl-1 lg:pl-2 pr-4 lg:pr-6"
      aria-label="Main navigation">
      <Logo class="min-w-min flex p-2 lg:p-2 xl:p-4">
        <router-link to="/" class="h-min flex items-center">
          <span class="sr-only">Glicks Bakery</span>
          <img
            class="h-20 md:h-26 lg:h-28 w-auto min-w-fit rounded-md lg:rounded-full p-0.5 border-solid border-2 border-rose-300"
            src="../assets/logo-en2.jpg" alt="Glicks Bakery" />
          <span
            class="flex lg:hidden ml-2 md:pl-2 text-amber-700 text-xl xs:text-2xl md:text-4xl font-cherrySwashScript">Glicks
            Bakery</span>
        </router-link>
      </Logo>
      <!--Top nav items-->
      <div class="hidden lg:flex gap-x-0 xl:gap-x-12 justify-between ml-16">
        <a v-for="item in navigation" :key="item.name" :href="item.href"
          class="text-xl lg:text-2xl font-extrabold font-cherrySwashScript leading-6 h-min rounded-md py-3 px-2 lg:px-3 text-gray-900 hover:bg-amber-100 hover:text-black flex-shrink-0">{{
            item.name }}</a>
      </div>
      <!--Currency selector -->
      <form class="mr-8 flex-shrink-0 relative">
        <label for="currency-selector" class="sr-only">Currency</label>
        <select id="currency-selector" name="currency-selector" @change="updateCurrency"
          class="text-2xl h-8 w-8 text-center rounded-full pb-1 px-1 text-gray-900 disabled:text-gray-500 hover:text-black bg-gray-200 hover:bg-amber-100 active:bg-amber-200 disabled:hover:bg-gray-200 border-none focus-visible:outline-none">
          <option class="bg-gray-100 font-sans" v-for="currency in currencies" :key="currency">{{ currency }}
          </option>
        </select>
        <ChevronDownIcon class="h-5 w-5 absolute top-1/2 right-1/2 text-gray-500" aria-hidden="true" />
      </form>

      <div class="flex">
        <button type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-900 bg-gray-200 hover:bg-amber-100 active:bg-amber-200"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-7 w-7" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Glicks Bakery</span>
            <img class="h-14 w-auto rounded-full" src="/favicon/favicon-glicks.png" alt="" />
          </a>
          <button type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-800 bg-gray-200 hover:bg-amber-100 active:bg-amber-200 active:border-none"
            @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 bg-none hover:bg-amber-100 hover:text-black">
                {{ item.name }}
              </a>
            </div>
            <div class="space-y-2 py-6">
              <a href="#contact-us" @click="mobileMenuOpen = false"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-green-200 hover:text-black">
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
import { inject, ref, watch } from 'vue'
import Logo from './Logo.vue'
import { Dialog, DialogPanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PhoneIcon, TruckIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Cakes', href: '#Cakes' },
  { name: 'Cookies', href: '#Cookies' },
  { name: 'Kedeishim', href: '#Kedeishim' },
  { name: 'Specials', href: '#Special' },
]

const currencies = ['₪', '$', '€', '£']

const currencyState = inject('currencyState')

function updateCurrency(event) {
  currencyState.selectedCurrency = event.target.value;
  console.log(currencyState.selectedCurrency)
}

const mobileMenuOpen = ref(false)
</script>