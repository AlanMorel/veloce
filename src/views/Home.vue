<template>
    <div class="index">
        <input type="checkbox" v-model="isActive" />
        <p>{{ isActive ? "active" : "inactive" }}</p>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const isActive = ref(false);
</script>

<style lang="scss">
    h2 {
        padding-top: 10px;
    }

    .table {
        width: 70%;
        margin: 30px auto;

        td {
            text-align: center;
            padding: 8px 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        }
    }
</style>
