import instance from "@/configs/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

// const fetchProducts = async () => {
//     const { data } = await instance.get('/api/products');
//     return data;
// };
export const useProduct = () => {
    const nav = useNavigate()
    const [messageApi] = message.useMessage()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["PRODUTCS"],
        queryFn: async () => {
            try {
                const res = await instance.get('/products')
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                nav('/500')
                messageApi.open({
                    type: "error",
                    content: "Lỗi " + error,
                })
            }
        },
    })

    return {
        data, isLoading, isError
    }
}

