import { Product, ProductResponse } from '@/common/types/product';
import { toast } from '@/components/ui/use-toast';
import instance from '@/configs/axios'
import { AxiosResponse } from 'axios';
const userDataString = localStorage.getItem('user');
let token = '';
if (userDataString) {
    try {
        const userData = JSON.parse(userDataString);
        token = userData.token || '';
    } catch (error) {
        console.error('Không thể phân tích dữ liệu từ localStorage:', error);
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get('/products', { params })
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}
export const getProductById = async (id: string) => {
    try {
        const response = await instance.get(`/products/${id}`)
        return response
    } catch (error: any) {
        throw new Error(error)
    }
}
export const addProduct = async (product: Product) => {
    try {
        const response = await instance.post(`/products`, product, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const removeProduct = async (id: string) => {
    try {
        const response = await instance.delete(`/products/${id}`, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response
    } catch (error) {
        console.log(error)
    }
}
export const editProduct = async (id: string, product: Product) => {
    try {
        const response = await instance.put(`/products/${id}`, product, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

