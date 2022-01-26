<template>
    <div class="logo">
        <img alt="Vue logo" src="./assets/images/logo.png" />
        <h2>Veloce</h2>
        <h3>Vue 3 + Vite + SSR + Typescript + Pinia + Vue Router + Express</h3>
        <p>{{ time }}</p>
    </div>
    <nav>
        <router-link :to="{ name: 'home' }">Go to Home</router-link>
        <router-link :to="{ name: 'user' }">Go to User</router-link>
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
        padding: 10px 0;
    }

    nav {
        width: 500px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        padding: 20px 0;
        border-radius: 4px;
    }
</style>
