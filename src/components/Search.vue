<script>
import axios from 'axios';
export default {
    data() {
        return {
            query: '',
            movieResults: null,
        };
    },
    methods: {
        async searchMovies() {
            if (!this.query) return;
            try {
                let apiUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=c55957c0a5d4a32160fa6b032a436368`;
                if (this.query.toLowerCase() === 'open') {
                    apiUrl += '&query=open';
                } else {
                    apiUrl += `&query=${this.query}`;
                }
                const response = await axios.get(apiUrl);
                if (response.data.results.length > 0) {
                    this.movieResults = response.data.results;
                } else {
                    this.movieResults = null;
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        },
        getMoviePosterUrl(posterPath) {
            // Check if posterPath is available, and if so, construct the full URL
            if (posterPath) {
                return `https://image.tmdb.org/t/p/w500/${posterPath}`;
            }
            // If no posterPath is available, you can display a placeholder image or handle it as needed
            return '/path/to/placeholder-image.jpg';
        },
    },
};
</script>











<template>
    <div class="text-center">
        <h1 class="text-3xl font-semibold my-2">Search results for: "{{ query }}"</h1>
    </div>
    <div>

        <div class="flex items-center justify-end space-x-4 mr-20 mt-4"> <!-- Add this container div with flex classes -->
            <input type="text" class="text-red-600" v-model="query" @input="searchMovies"
                placeholder="Search for a movie" />
            <button @click="searchMovies"
                class="px-6 py-4 rounded-md bg-orange-700 w-fit transition hover:bg-neutral-800 font-semibold">
                Search
            </button>
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  grid grid-cols-4 gap-5 mx-20 my-10">
            <div v-if="movieResults && movieResults.length > 0" v-for="movie in movieResults" :key="movie.id"
                class="rounded-lg shadow-md p-4">
                <RouterLink :to="`/movies/${movie.id}`">
                    <div class="relative group w-full h-full">
                        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster"
                            class="w-full h-auto transition rounded-md group-hover:blur-sm cursor-pointer" />
                        <div
                            class="group-hover:opacity-100 transition-opacity opacity-0 absolute left-[-50%] top-[50%] translate-x-[50%] flex flex-col gap-2 w-full font-semibold text-white">
                            <div class="w-full flex flex-col items-center justify-center">
                                <button>
                                    <Icon icon="ic:round-play-arrow" width="60" class="hover:text-orange-600" />
                                </button>
                            </div>
                        </div>

                        <div class="absolute top-4 right-4 px-2 bg-orange-700 py-1 rounded-md">
                            <p class="flex items-center gap-1 justify-center">
                                <span>{{ movie.vote_average }}</span>
                                <Icon icon="material-symbols:star-rounded" color="white" />
                            </p>
                        </div>
                        <div>
                            <h1 class="text-xl font-semibold my-2">{{ movie.title }}</h1>
                            <p class="text-neutral-400 text-sm">{{ movie.overview }}</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div v-else>
                <p class="grid items-center">No movies found for "{{ query }}"</p>
            </div>
        </div>
    </div>
</template>