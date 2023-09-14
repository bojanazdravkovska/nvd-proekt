<script>
import axios from 'axios';
export default {
    data() {
        return {
            searchQuery: '',
            searchResults: [],
            recommendations: [],
        };
    },
    methods: {
        async searchMovie() {
            const apiKey = 'c55957c0a5d4a32160fa6b032a436368';
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: apiKey,
                    query: this.searchQuery,
                },
            });
            this.searchResults = response.data.results;
        },
        async getRecommendations(movieId) {
            const apiKey = 'c55957c0a5d4a32160fa6b032a436368';
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
                params: {
                    api_key: apiKey,
                    language: 'en-US',
                    page: 1,
                },
            });
            this.recommendations = response.data.results;
            const recommendationsSection = document.getElementById('recommendations-section');
            recommendationsSection.style.display = 'block';
            recommendationsSection.style.opacity = '1';
            recommendationsSection.style.height = 'auto';
            recommendationsSection.scrollIntoView({ behavior: 'smooth' });
        },
        getMoviePosterUrl(posterPath) {
            if (posterPath) {
                return `https://image.tmdb.org/t/p/w500/${posterPath}`;
            }
            return '/path/to/placeholder-image.jpg';
        },
    },
};
</script>


<template>
    <div class="text-center">
        <h1 class="text-3xl font-semibold my-2 text-center">Movie Recommendations</h1>
    </div>
    <div>

        <div class="flex items-center justify-end space-x-4 mr-20 mt-4">
            <input type="text" v-model="searchQuery" class="text-red-600 rounded-md" placeholder="Enter a movie title" />
            <button @click="searchMovie"
                class="px-6 py-4 rounded-md bg-orange-700 w-fit transition hover:bg-neutral-800 font-semibold">Search</button>

        </div>

        <!-- Display search results here -->
        <div v-if="searchResults.length">
            <h2 class="text-2xl font-semibold my-2 text-center">Search Results</h2>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  grid grid-cols-4 gap-5 mx-20 my-10">
                <div v-for="movie in searchResults" :key="movie.id" class="rounded-lg shadow-md p-4">
                    <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster"
                        class="w-full h-auto transition rounded-md group-hover:blur-sm cursor-pointer" />
                    <h1 class="text-xl font-semibold my-2">{{ movie.title }}</h1>
                    <p class="text-neutral-400 text-sm">{{ movie.overview }}</p>
                    <button @click="getRecommendations(movie.id)"
                        class="mt-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Get
                        Recommendations</button>
                </div>
            </div>
        </div>

        <hr class="my-4">
        <br>
        <!-- Display recommendations here -->
        <div v-if="recommendations.length" id="recommendations-section"
            class="hidden opacity-0 h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <h2 class="text-2xl font-semibold my-2 text-center text-orange-600">Recommendations</h2>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  grid grid-cols-4 gap-5 mx-20 my-10">
                <div v-for="movie in recommendations" :key="movie.id" class="rounded-lg shadow-md p-4">
                    <RouterLink :to="`/movies/${movie.id}`">
                        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster"
                            class="w-full h-auto transition rounded-md group-hover:blur-sm cursor-pointer" />
                        <h1 class="text-xl font-semibold my-2">{{ movie.title }}</h1>
                        <p class="text-neutral-400 text-sm">{{ movie.overview }}</p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>