<template>
  <section aria-labelledby="perks-heading" class="border-t border-gray-200 bg-gray-50">
    <h2 id="perks-heading" class="sr-only">Our perks</h2>

    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
        <div v-for="perk in perks" :key="perk.name"
          class="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
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
</template>

<script setup>
const perks = ([
  {
    name: 'We deliver to YOUR family',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer delivery to anywhere in Yerushalayim and you can call us from anywhere in the world.',
  },
  {
    name: 'Gift your loved ones',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'You may be far from them geographically but you are so close in heart.',
  },
  {
    name: 'Call us now from around the world',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'We have special for our customers abroad american and British phone numbers.',
  },
])
</script>