import Axios from "axios";

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
    const { data } = await Axios.get<IResponse<IFruitItem[]>>("http://localhost:3000/justTest/getFruitList");
    if (data.code === 0) {
        return data.data;
    }
    return [];
};
