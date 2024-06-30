<template>
    <header class="px-5">
        <div class=" border-b border-solid border-gray-300">
            <nav class="flex items-center md:gap-10 justify-center py-2 lg:py-3 pl-1 lg:pl-2 pr-4 lg:pr-6"
                aria-label="Main navigation">
                <Logo class="min-w-min flex p-2 lg:p-2 xl:p-4">
                    <RouterLink to="/" class="h-min flex items-center">
                        <span class="sr-only">Glicks Bakery</span>
                        <img class="h-20 lg:h-24 w-auto min-w-fit rounded-md lg:rounded-full p-0.5 border-solid border-2 border-rose-300"
                            src="../../assets/images/logo-en2.jpg" alt="Glicks Bakery" />
                        <span
                            class="flex lg:hidden ml-2 md:pl-2 text-amber-700 text-xl xs:text-2xl md:text-4xl font-cherrySwashScript">Glicks
                            Bakery</span>
                    </RouterLink>
                </Logo>
            </nav>
        </div>
    </header>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
</script>