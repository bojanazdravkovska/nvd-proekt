import Home from "../view/Home.vue"
import Movie from "../view/Movie.vue"
import Popular from "../view/Popular.vue"
import Search from '../components/Search.vue';
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: "/", component: Home },
    { path: "/movies/:id", component: Movie },
    { path: "/popular", component: Popular },
    {
        path: '/search',
        component: Search,
        name: 'search',
      },
]

export const router = createRouter({
    history: createWebHistory(), // za back da moze da pamti
    routes
})