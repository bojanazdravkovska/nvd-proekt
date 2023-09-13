<script setup>
import getImage from "../lib/getImage"
//import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const { banner } = defineProps(["banner"])
const {
    id,
    title,
    overview: description,
    backdrop_path: background,
} = banner

</script>
<template>
  <div
    class="w-screen h-screen"
    :style="{
         backgroundImage: 'url('+getImage(background)+')',
         backgroundPosition: 'center'
    }">

       <div class="text-orange p-20 flex flex-col justify-center full h-full">
        <h1 class="mt-32 ml-64 text-8xl font-bold">{{ title }}</h1>
        <p class=" mt-4 ml-64 w-1/2 text-sm"> {{ description }}</p>
        <RouterLink :to="`/movies/${id}`" class=" ml-64 flex items-center gap-1 px-6 py-4 rounded-md bg-orange-700 w-fit mt-4 transition hover:bg-neutral-800 font-semibold">
                <span>View More</span>
                <span>
                    <Icon icon="ic:round-play-arrow" />
                </span>
                </RouterLink>
       
       </div>
  </div>
</template>

