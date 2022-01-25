<template>
    <div class="index">
        <ElSwitch v-model="isActive" active-color="#13ce66" inactive-color="#ff4949"> switch </ElSwitch>
    </div>
</template>

<script lang="ts" setup>
    import { ElSwitch } from "element-plus";
    import "element-plus/theme-chalk/el-switch.css";
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
