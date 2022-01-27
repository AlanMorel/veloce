import Axios from "axios";
import Config from "../Config";

interface IResponse<T> {
    code: number;
    data: T;
    msg: string;
}

export interface IFruitItem {
    id: number;
    name: string;
    price: number;
}

export const getFruitList = async (): Promise<IFruitItem[]> => {
    const { data } = await Axios.get<IResponse<IFruitItem[]>>(Config.base + "/api/fruits");
    return data.data;
};
