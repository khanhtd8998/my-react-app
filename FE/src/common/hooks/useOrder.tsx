import instance from "@/configs/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd";

type OrderPayload = {
    name?: string;
    phone?: number;
    address?: string
    payment?: string
}
export const useOrder = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const { mutate: createOrderFormCart } = useMutation({
        mutationFn: async (data: OrderPayload) => {
            try {
                const res = await instance.post('/orders', data)
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                throw new Error(error.response.data.error)
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'Đặt hàng thành công'
            })
        }
    })

    const { data: orderData } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            try {
                const res = await instance.get('/orders')
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                throw new Error(error.response.data.error)
            }
        }
    })
    return {
        orderData,
        createOrderFormCart,
        contextHolder
    }
}