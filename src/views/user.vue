<template>
    <div class="user">
        User Page
        <div v-if="isLogin" class="info">
            <div class="box-card">
                <div>User logged in</div>
                <div>Username: {{ userInfo.name }}</div>
            </div>
        </div>
        <form v-else class="form" @submit.prevent="submitHandle">
            <label label="username">
                <input type="text" v-model="username" />
            </label>
            <label label="password">
                <input type="password" v-model="password" />
            </label>
            <label>
                <button>Submit</button>
            </label>
        </form>
    </div>
</template>

<script lang="ts">
    import { useStore } from "@/src/store/user";
    import { computed, defineComponent, reactive, ref, toRefs } from "vue";

    export default defineComponent({
        name: "User",
        components: {},
        setup() {
            const params = reactive({
                username: "",
                password: ""
            });
            const store = useStore();
            const userInfo = computed(() => {
                return store.userInfo;
            });
            const loading = ref(false);
            const isLogin = computed(() => !!userInfo.value.token);
            const submitHandle = () => {
                const { username, password } = params;

                if (!username || !password) {
                    return;
                }

                loading.value = true;
                store.updateUser({
                    name: username,
                    userId: "1",
                    token: Math.random().toString(36).slice(-8)
                });
                loading.value = false;
            };
            return { ...toRefs(params), loading, submitHandle, userInfo, isLogin };
        }
    });
</script>

<style lang="scss">
    .form {
        width: 450px;
        margin: 0 auto;
    }

    .box-card {
        width: 480px;
        margin: 20px auto;
    }
</style>
