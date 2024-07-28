import instance from "@/configs/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd"

// const fetchProducts = async () => {
//     const { data } = await instance.get('/api/products');
//     return data;
// };
export const useProduct = () => {

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

