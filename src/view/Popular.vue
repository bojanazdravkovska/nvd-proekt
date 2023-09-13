<script setup>
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"
import getImage from "../lib/getImage"
import { ref, defineAsyncComponent } from "vue"

const router = useRouter()
const movies = ref([])

    movies.value = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=c55957c0a5d4a32160fa6b032a436368&language=en-US")
    .then(res => res.json())
    .then(res => res.results)
  
  
  const AsyncMovieList= defineAsyncComponent(() => {
  return import("../components/MovieList.vue")
})
  
</script>

<template>
  <AsyncMovieList
    :movies="movies"
    />
</template>