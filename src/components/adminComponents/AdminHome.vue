<template>
    <div class="bg-inherit">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-none lg:py-6">
                <h2 class="text-2xl font-bold text-gray-900">Actions</h2>

                <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    <div v-for="callout in callouts" :key="callout.name" class="group relative">
                        <div
                            class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                            <img :src="callout.imageSrc" :alt="callout.imageAlt"
                                class="h-full w-full object-cover object-center" />
                        </div>
                        <h3 class="mt-6 text-sm text-gray-500">
                            <RouterLink :to="callout.href">
                                <span class="absolute inset-0" />
                                {{ callout.name }}
                            </RouterLink>
                        </h3>
                        <p class="text-base font-semibold text-gray-900">{{ callout.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import addItems from '@/assets/images/addItems.jpg'
import addCategory from '@/assets/images/addCategory.jpg'
import editItems from '@/assets/images/editItems.jpg'

const callouts = [
    {
        name: 'Add new Items',
        description: 'Here you can add as many items as needed',
        imageSrc: addItems,
        imageAlt: 'StockCake.com Delectable Bakery Display.',
        href: '/admin/addItems',
    },
    {
        name: 'Add new category',
        description: 'Here you can add a category',
        imageSrc: addCategory,
        imageAlt: 'pexels-solliefoto',
        href: './addCategory',
    },
    {
        name: 'Edit Items',
        description: 'Edit and delete items',
        imageSrc: editItems,
        imageAlt: 'pexels-igor-ovsyannykov',
        href: './editItems',
    },
    {
        name: 'Edit Categories',
        description: 'Edit and delete categories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-04.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: './editCategories',
    },
]
</script>
