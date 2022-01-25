import { getFruitList, IFruitItem } from "@/api/market";
import { defineStore } from "pinia";

interface State {
    fruitList: IFruitItem[];
}

export const useStore = defineStore("market", {
    state: (): State => ({
        fruitList: []
    }),
    actions: {
        async setFruitList() {
            try {
                this.fruitList = await getFruitList();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
