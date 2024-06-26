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
                <!--Top nav items
            <div class="hidden lg:flex gap-x-0 xl:gap-x-12 justify-between ml-16">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                    class="text-xl font-extrabold font-cherrySwashScript leading-4 h-min rounded-md py-3 px-2 lg:px-3 text-gray-900 hover:bg-amber-100 hover:text-black flex-shrink-0">{{
                        item.name }}</a>
            </div> -->
                <!--Currency selector
            <div>
                <form>
                    <div>
                        <label for="currency-selector" class="sr-only">Currency</label>
                        <div class="mr-8 flex-shrink-0">
                            <select id="currency-selector" name="currency-selector" @change="updateCurrency"
                                class="text-2xl h-min rounded-full pb-1 px-1 text-gray-900 disabled:text-gray-500 hover:text-black bg-gray-200 hover:bg-amber-100 active:bg-amber-200 disabled:hover:bg-gray-200 flex-shrink-0 border-none focus-visible:outline-none">
                                <option class="bg-gray-100 font-sans" v-for="currency in currencies" :key="currency">{{
                                    currency }}
                                </option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
-->
                <!--Mobile menu button
            <div class="flex">
                <button type="button"
                    class="inline-flex items-center justify-center rounded-md p-2 text-gray-900 bg-gray-200 hover:bg-amber-100 active:bg-amber-200"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-7 w-7" aria-hidden="true" />
                </button>
            </div>
-->
            </nav>
            <!--
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
                                <a v-for="item in navigation" :key="item.name" :href="item.href"
                                    @click="mobileMenuOpen = false"
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
            -->
        </div>
    </header>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
</script>