<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted, computed, inject } from "vue";
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

//const rating = ref(0); //initialize the rating  

const rating = inject('sharedState').rating;

const rateMovie = (stars) => {
    rating.value = stars; //update the stars
};
const computedRating = computed(() => {
    if ((Math.round(vote) + rating.value) >= 10) {
        return "10";
    } else {
        return Math.round(vote) + rating.value;
    }
});

</script>

<template>
    <div class="h-screen w-screen grayscale-0">
        <div class="w-full h-full ">
            <div class="pt-20 w-full h-full grid grid-cols-2 items-center">
                <img class="w-[400px] mx-auto rounded-lg" :src="getImage(poster)" />
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
                            <!-- <span>{{ Math.round(vote) }}/10</span> -->
                            <span>{{ computedRating }}/10</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Icon icon="ion:people" />
                            <span>{{ popularity }} </span>
                        </div>
                        <div class="flex items-center gap-2 mt-3">
                            <span>Rate this movie:</span>
                            <div class="cursor-pointer" @click="rateMovie(1)">
                                <Icon icon="fa-solid:star" :color="rating >= 1 ? 'yellow' : 'gray'" />
                            </div>
                            <div class="cursor-pointer" @click="rateMovie(2)">
                                <Icon icon="fa-solid:star" :color="rating >= 2 ? 'yellow' : 'gray'" />
                            </div>
                            <div class="cursor-pointer" @click="rateMovie(3)">
                                <Icon icon="fa-solid:star" :color="rating >= 3 ? 'yellow' : 'gray'" />
                            </div>
                            <div class="cursor-pointer" @click="rateMovie(4)">
                                <Icon icon="fa-solid:star" :color="rating >= 4 ? 'yellow' : 'gray'" />
                            </div>
                            <div class="cursor-pointer" @click="rateMovie(5)">
                                <Icon icon="fa-solid:star" :color="rating === 5 ? 'yellow' : 'gray'" />
                            </div>
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