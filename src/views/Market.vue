<template>
    <div>
        <h2>Fruits</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in fruitList" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from "../store/market";

    const store = useStore();
    await store.setFruitList();

    const fruitList = store.fruitList;
</script>

<style lang="scss">
    .table {
        width: 100%;
        max-width: 48rem;
        margin: 2rem auto;

        td {
            text-align: center;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
    }
</style>
