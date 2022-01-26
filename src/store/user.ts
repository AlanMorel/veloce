import { defineStore } from "pinia";

interface IUser {
    name: string;
    userId: string;
    token: string;
}

interface IUserState {
    userInfo: IUser;
}

export const useStore = defineStore("user", {
    state: (): IUserState => ({
        userInfo: {
            name: "",
            userId: "",
            token: ""
        }
    }),
    getters: {
        isLogin(state) {
            return !!state.userInfo.token;
        }
    },
    actions: {
        updateToken(token: string) {
            this.userInfo.token = token;
        },
        updateUser(user: IUser) {
            this.userInfo = user;
        }
    }
});
