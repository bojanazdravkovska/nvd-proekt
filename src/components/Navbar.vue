<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
</script>


<template>
    <nav class="flex items-center justify-between flex-wrap bg-gradient-to-r from-orange-500 to-neutral-950 p-2 border-y-2">
        <div class="ml-12 flex text-3xl items-center font-bold gap-2">
            <RouterLink :to="`/`">
                <Icon icon="fluent:movies-and-tv-24-regular" width="40" />
            </RouterLink>
            <span>MovieApp</span>
        </div>
        <ul class="flex items-center gap-4 font-semibold">
            <li>
                <div class="flex items-center gap-1 hover:text-orange-600 no-underline hover:underline ">
                    <RouterLink :to="'/search'">
                        <span>Search</span>
                        <Icon icon="ri:search-line" />
                    </RouterLink>


                </div>
            </li>
            <RouterLink :to="`/popular`">
                <li class="hover:text-orange-600 no-underline hover:underline ">Popular Movies</li>
            </RouterLink>
            <RouterLink :to="`/recommendations`">
                <li class="hover:text-orange-600 no-underline hover:underline " style="padding-right: 40px;">Recommandation
                </li>
            </RouterLink>
        </ul>
    </nav>
</template>
<!-- 
<template>
    <nav class="absolute top-4 left-0 right-0 w-full flex z-10 text-white items-center gap-20  mx-6 py-4 bg-transparent border-b-2 border-neutral-400">
        <RouterLink to="/" class="flex text-3xl items-center font-bold gap-2">
            <Icon icon="mingcute:movie-line" width="40" />
            <span>MoVue</span>
        </RouterLink>
        <ul class="flex items-center gap-4 font-semibold">
            <li>MoVues</li>
            <li>Favourite MoVues</li>
        </ul>
    </nav>
</template>
-->