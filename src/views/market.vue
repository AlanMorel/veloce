<template>
    <div>
        <h2>FruitList</h2>
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
    import { useStore } from "@/src/store/market";

    const store = useStore();
    await store.setFruitList();

    const fruitList = store.fruitList;
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
