<template>
    <div class="login">
        <h2>Login</h2>
        <div v-if="isLogin" class="info">
            <div class="box-card">
                <div>User logged in</div>
                <div>Username: {{ userInfo.name }}</div>
            </div>
        </div>
        <form v-else class="form" @submit.prevent="submitHandle">
            <div class="form__section" label="username">
                <span class="form__label">Username</span>
                <input type="text" v-model="username" />
            </div>
            <div class="form__section" label="password">
                <span class="form__label">Password</span>
                <input type="password" v-model="password" />
            </div>
            <div class="form__button-container">
                <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, ref, toRefs } from "vue";
    import { useStore } from "../store/user";

    export default defineComponent({
        name: "Login",
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
        display: flex;
        flex-direction: column;
        max-width: 20rem;
        margin: auto;
    }

    .form__section {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .form__label {
        text-align: left;
        margin-bottom: 0.5rem;
    }

    .form__button-container {
        text-align: right;
    }
</style>
