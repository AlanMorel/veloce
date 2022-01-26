<template>
    <div class="index">
        <h2>Home</h2>
        <input type="checkbox" v-model="isActive" />
        <p>{{ isActive ? "active" : "inactive" }}</p>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const isActive = ref(false);
</script>
