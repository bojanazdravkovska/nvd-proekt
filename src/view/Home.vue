<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"

// ref -> if variable changes, html is rerendered
const bannerMovieResult = ref([])
const bannerMovie = ref(null)

// async component so we can pass bannermovie as a prop
const AsyncBanner = defineAsyncComponent(() => {
  return import("../components/Banner.vue")
})

const getMovieBanner = async () => {
      // otkako ke se fetchira se togas ke gi zememe filmovite zatoa prvo cekame so await
 
  bannerMovieResult.value = await fetch("https://api.themoviedb.org/3/search/movie?api_key=c55957c0a5d4a32160fa6b032a436368&query=oppenheimer")
  .then(res => res.json())
  .then(res => res.results)

}

 

onBeforeMount(async() => {
  await getMovieBanner() 
  //  console.log(bannerMovieResult.value[0])
  bannerMovie.value = bannerMovieResult.value[0]
  
})

</script>

<template>
   <!-- passing banner as a prop with :bannner="bannerMovie"-->

    <AsyncBanner 
    :banner="bannerMovie"
    />
   
</template>