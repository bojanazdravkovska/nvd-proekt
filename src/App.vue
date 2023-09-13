<script setup>
import { RouterView } from "vue-router"
// suspense e za sekoe dete da poceka da se loadira pred da se prikaze stranata

import Navbar from "./components/Navbar.vue";
</script>


<template>
    <Navbar />
    <Suspense> 
        <RouterView />
    </Suspense>

</template>
