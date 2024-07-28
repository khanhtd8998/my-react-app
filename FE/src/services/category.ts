import instance from "@/configs/axios"
import { AxiosResponse } from "axios"

export const getAllCategories = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get('/categories', { params })
        return response
    } catch (error: any) {
        return error
    }
}