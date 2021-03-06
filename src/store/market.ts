import { getFruitList, IFruitItem } from "@/shared/api/Market";
import { defineStore } from "pinia";

interface IMarketState {
    fruitList: IFruitItem[];
}

export const useStore = defineStore("market", {
    state: (): IMarketState => ({
        fruitList: []
    }),
    actions: {
        async setFruitList() {
            this.fruitList = await getFruitList();
        }
    }
});
