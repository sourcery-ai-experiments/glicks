<template>
    <div class="bg-white">
      <!-- Mobile menu --> 
      <main>
        <!-- Hero section -->
        <div class="relative">
          <!-- Background image and overlap -->
          <div class="relative mx-auto max-w-3xl h-24 px-4 pb-96 text-center">
            <!-- Background image and overlap -->
            <div aria-hidden="true" class="absolute inset-0 flex flex-col">
              <div class="relative w-full flex-1 bg-gray-800">
                <div class="absolute inset-0 overflow-hidden">
                  <img src="/images/main_image.png" alt="" class="h-full w-full object-cover object-center" />
                </div>
                <div class="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
            </div>
          </div>
  
          <section aria-labelledby="item-heading" class="relative -mt-56 sm:mt-0">
            <h2 id="item-heading" class="sr-only">items</h2>
            <div class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
              <div v-for="item in items" :key="item.name" class="group relative h-96 rounded-lg bg-white shadow-lg shadow-black sm:aspect-h-5 sm:aspect-w-4 sm:h-auto">
                <div>
                  <div aria-hidden="true" class="absolute inset-0 overflow-hidden rounded-lg">
                    <div class="absolute inset-0 overflow-hidden group-hover:opacity-75">
                      <img :src="item.imageSrc" :alt="item.imageAlt" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                  </div>
                  <div class="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
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
          <div class="mx-auto max-w-7xl px-4 py-6 mt-24 sm:px-6 sm:mt-32 lg:px-8 lg:mt-32 bg-rose-50 -pt-24">
            <div class="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" class="text-2xl font-bold tracking-tight text-gray-900">Popular Items</h2>
            </div>
  
            <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              <div v-for="product in trendingProducts" :key="product.id" class="group relative bg-white w-56 rounded-lg shadow-md pb-3">
                <div class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 ">
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
  
  const items = ref([
    {
      name: "Cakes",
      href: '#',
      imageSrc: '/images/main_image.png',
      imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
    },
    {
      name: "Cookies",
      href: '#',
      imageSrc: '/images/main_image.png',
      imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
      name: 'Desk Accessories',
      href: '#',
      imageSrc: '/images/main_image.png',
      imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ])
  const trendingProducts = ref([
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
  ])
  const perks = ([ 
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
  ])
  const open = ref(false)
  </script>