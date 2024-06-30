<template>
    <div v-for="item in items" :key="item.id"
        class="group relative bg-white w-5/6 aspect-1 rounded-lg shadow-md pb-3 transition hover:scale-105 hover:cursor-pointer duration-300">
        <div class="aspect-[4/3] w-full rounded-lg group-hover:opacity-75 duration-300">
            <img :src="'/images/' + item.imageSrc" :alt="item.imageAlt" class="w-full h-full object-cover rounded-lg" />
        </div>
        <h3 class="mt-4 text-lg">
            <a @click="openModal(item)" type="button" class="text-amber-700">
                <span class="absolute inset-0"></span>
                {{ item.name }}
            </a>
        </h3>
        <p class="mt-1 text-lg font-medium text-gray-900">
            {{ itemCurrency + item.price[itemCurrency] }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    items: Array,
    itemCurrency: String
})

// Emit openModal
const emit = defineEmits(['openModal'])

function openModal(item){
    emit('openModal', item)
}
</script>
