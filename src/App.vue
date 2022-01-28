<template>
    <div class="logo">
        <img alt="Vue logo" src="./assets/images/logo.png" />
        <h1>Veloce</h1>
        <h2>Vue 3 + Vite + SSR + Typescript + Pinia + Vue Router + Express + Docker</h2>
        <p class="time">{{ time }}</p>
    </div>
    <nav>
        <router-link :to="{ name: 'home' }">Go to Home</router-link>
        <router-link :to="{ name: 'login' }">Go to Login</router-link>
        <router-link :to="{ name: 'market' }">Go to Market</router-link>
    </nav>
    <hr />
    <div class="container">
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    let time = ref(new Date().toLocaleString());

    setInterval(() => {
        time.value = new Date().toLocaleString();
    }, 500);
</script>

<style lang="scss">
    .logo {
        text-align: center;
    }

    .container {
        padding: 1rem 0;
    }

    nav {
        width: 100%;
        max-width: 30rem;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        padding: 1.5rem 0;
    }

    .time {
        padding: 0.5rem 0;
    }
</style>
