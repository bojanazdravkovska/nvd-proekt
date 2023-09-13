<script setup>
import MovieCard from './MovieCard.vue';
const { movies } = defineProps({
    movies: Array
})
</script>

<template>
   <div class="grid grid-cols-4 gap-5 mx-20 my-10">
        <MovieCard
        v-for="movie in movies"
        :key="Math.random() * 10000"
        :movie="movie"
        />
   </div>
</template>