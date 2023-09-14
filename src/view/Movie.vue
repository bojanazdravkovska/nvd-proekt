<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue"
import getImage from "../lib/getImage"


const router = useRouter()
// movies/76600 
// params -> se posle movies/
const movieId = router.currentRoute.value.params.id
// console.log(movieId)
const movie = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
    movie.value = await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
});

movie.value = await fetch
(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`).
then(res => res.json())

// console.log(movie)
const {
    title,
    overview,
    backdrop_path: background,
    poster_path: poster,
    release_date,
    vote_average: vote,
    popularity,
    runtime
} = movie.value
const movieDuration = Math.round(runtime / 60)

</script>

<template>
    <div
    class="h-screen w-screen grayscale-0"
    >
        <div class="w-full h-full ">
            <div class="pt-20 w-full h-full grid grid-cols-2 items-center">
                <img
                class="w-[400px] mx-auto rounded-lg"
                :src="getImage(poster)"
                />
                <div>
                    <h1 class="text-4xl font-semibold mb-4">{{ title }}</h1>
                    <p class="text-sm text-neutral-300 w-2/3">{{ overview }}</p>
                    <div class="flex flex-col text-sm gap-2 mt-3">
                        <div class="flex items-center gap-2">
                            <Icon icon="uiw:date" />
                            <span>{{ release_date }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Icon icon="ic:round-star" />
                            <span>{{ Math.round(vote) }}/10</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Icon icon="ion:people" />
                            <span>{{ popularity }} </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Icon icon="ic:twotone-access-time-filled" color="white" />
                            <span>{{ movieDuration }}h / {{ runtime }} minutes</span>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>