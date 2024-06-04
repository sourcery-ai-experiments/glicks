<template>
    <div class="bg-white">
      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-40 lg:hidden" @close="open = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div class="flex px-4 pb-2 pt-5">
                  <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
  
                <!-- Links -->
                <TabGroup as="div" class="mt-2">
                  <div class="border-b border-gray-200">
                    <TabList class="-mb-px flex space-x-8 px-4">
                      <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                        <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{ category.name }}</button>
                      </Tab>
                    </TabList>
                  </div>
                  <TabPanels as="template">
                    <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-12 px-4 py-6">
                      <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                        <div v-for="item in category.featured" :key="item.name" class="group relative">
                          <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                            <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                          </div>
                          <a :href="item.href" class="mt-6 block text-sm font-medium text-gray-900">
                            <span class="absolute inset-0 z-10" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                          <p aria-hidden="true" class="mt-1 text-sm text-gray-500">Shop now</p>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
  
                <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                    <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                  </div>
                </div>
  
                <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create an account</a>
                  </div>
                  <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                  </div>
                </div>
  
                <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                  <!-- Currency selector -->
                  
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>  
      <main>
        <!-- Hero section -->
        <div class="relative">
          <!-- Background image and overlap -->
          <div aria-hidden="true" class="absolute inset-0 hidden sm:flex sm:flex-col">
            <div class="relative w-full flex-1 bg-gray-800">
              <div class="absolute inset-0 overflow-hidden">
                <img src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg" alt="" class="h-full w-full object-cover object-center" />
              </div>
              <div class="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div class="h-32 w-full bg-white md:h-40 lg:h-48" />
          </div>
  
          <div class="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            <!-- Background image and overlap -->
            <div aria-hidden="true" class="absolute inset-0 flex flex-col sm:hidden">
              <div class="relative w-full flex-1 bg-gray-800">
                <div class="absolute inset-0 overflow-hidden">
                  <img src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg" alt="" class="h-full w-full object-cover object-center" />
                </div>
                <div class="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div class="h-48 w-full bg-white" />
            </div>
            <div class="relative py-32">
              <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mid-Season Sale</h1>
              <div class="mt-4 sm:mt-6">
                <a href="#" class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700">Shop item</a>
              </div>
            </div>
          </div>
  
          <section aria-labelledby="item-heading" class="relative -mt-96 sm:mt-0">
            <h2 id="item-heading" class="sr-only">items</h2>
            <div class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
              <div v-for="item in items" :key="item.name" class="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto">
                <div>
                  <div aria-hidden="true" class="absolute inset-0 overflow-hidden rounded-lg">
                    <div class="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <img :src="item.imageSrc" :alt="item.imageAlt" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div class="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                      <p aria-hidden="true" class="text-sm text-white">Shop the item</p>
                      <h3 class="mt-1 font-semibold text-white">
                        <a :href="item.href">
                          <span class="absolute inset-0" />
                          {{ item.name }}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
  
        <section aria-labelledby="trending-heading">
          <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div class="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" class="text-2xl font-bold tracking-tight text-gray-900">Trending Products</h2>
              <a href="#" class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                Shop the item
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
  
            <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              <div v-for="product in trendingProducts" :key="product.id" class="group relative">
                <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center" />
                </div>
                <h3 class="mt-4 text-sm text-gray-700">
                  <a :href="product.href">
                    <span class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }}</p>
              </div>
            </div>
  
            <div class="mt-8 text-sm md:hidden">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Shop the item
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>
  
        <section aria-labelledby="perks-heading" class="border-t border-gray-200 bg-gray-50">
          <h2 id="perks-heading" class="sr-only">Our perks</h2>
  
          <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              <div v-for="perk in perks" :key="perk.name" class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div class="md:flex-shrink-0">
                  <div class="flow-root">
                    <img class="-my-1 mx-auto h-24 w-auto" :src="perk.imageUrl" alt="" />
                  </div>
                </div>
                <div class="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 class="text-base font-medium text-gray-900">{{ perk.name }}</h3>
                  <p class="mt-3 text-sm text-gray-500">{{ perk.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  
  const navigation = {
    categories: [
      {
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            name: 'Accessories',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
            imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
          },
          {
            name: 'Carry',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
            imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
          },
        ],
      },
      {
        name: 'Men',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
            imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
          },
          {
            name: 'Basic Tees',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
            imageAlt: 'Model wearing light heather gray t-shirt.',
          },
          {
            name: 'Accessories',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
            imageAlt:
              'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
          },
          {
            name: 'Carry',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
            imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
          },
        ],
      },
    ],
    pages: [
      { name: 'Company', href: '#' },
      { name: 'Stores', href: '#' },
    ],
  }
  const items = [
    {
      name: "Women's",
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-item-01.jpg',
      imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
    },
    {
      name: "Men's",
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-item-02.jpg',
      imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
      name: 'Desk Accessories',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-item-03.jpg',
      imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ]
  const trendingProducts = [
    {
      id: 1,
      name: 'Classic Chocolate Cake',
      color: 'Classic and good!',
      price: '$25',
      href: '#',
      imageSrc: '/images/perfect_chocolate_cake_crop.jpg',
      imageAlt: 'Perfect crop of classic chocolate cake.',
      description:{
        text: 'Placeholder for descriptive text for the item',
        Allergens: 'Contains: eggs, wheat',
        category: 'Cake',
      }
    },
    // More products...
  ]
  const perks = [ 
    {
      name: 'Same day delivery',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
      description:
        'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
    },
    {
      name: 'All year discount',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
      description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
    },
    {
      name: 'Connecting families around the world',
      imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
      description: 'We offer special attention and quality service to people from abroad ordering for their\
                    relatives in Jerusalem. Because we understand and care.',
    },
  ]
  const open = ref(false)
  </script>