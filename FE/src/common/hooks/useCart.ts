import instance from '@/configs/axios'
import { useAuth } from '@/contexts/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// const useCart = () => {
//     const queryClient = useQueryClient()
//     const [user] = useLocalStorage('user', {})
//     const userId = user?.user?._id

//     const { data, ...restQuery } = useQuery({
//         queryKey: ['cart', userId],
//         queryFn: async () => {
//             const { data } = await axios.get(`http://localhost:8080/api/v1/carts/${userId}`)
//             return data
//         }
//     })

//     const updateQuantityDebounce = debounce(async (productId, quantity: number) => {
//         await axios.post(`http://localhost:8080/api/v1/carts/update`, {
//             userId,
//             productId,
//             quantity
//         })
//         queryClient.invalidateQueries({
//             queryKey: ['cart', userId]
//         })
//     }, 300)

//     const { mutate } = useMutation({
//         mutationFn: async ({ action, productId }: { action: string; productId: string }) => {
//             switch (action) {
//                 case 'INCREMENT':
//                     await axios.post(`http://localhost:8080/api/v1/carts/increase`, {
//                         userId,
//                         productId
//                     })
//                     break
//                 case 'DECREMENT':
//                     await axios.post(`http://localhost:8080/api/v1/carts/decrease`, {
//                         userId,
//                         productId
//                     })
//                     break
//                 case 'REMOVE':
//                     await axios.post(`http://localhost:8080/api/v1/carts/remove`, {
//                         userId,
//                         productId
//                     })
//                     break
//             }
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['cart', userId]
//             })
//         }
//     })

//     const handleQuantityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
//         const quantity = parseInt(e.target.value)
//         updateQuantityDebounce(productId, quantity)
//     }
//     const calculateTotal = () => {
//         if (!data || !data.products) return 0
//         return reduce(data.products, (total, product) => total + product.price * product.quantity, 0)
//     }

//     return {
//         data,
//         mutate,
//         calculateTotal,
//         handleQuantityChange,
//         ...restQuery
//     }
// }

const useCart = () => {
    const queryClient = useQueryClient()
    // const token = localStorage.getItem('accessToken')
    const { isLogin } = useAuth()
    const [count, setCount] = useState(0)
    const { data: cartData } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            try {
                const res = await instance.get("/carts")
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                console.log(error.response.data.error);
            }
        },
        enabled: isLogin
    })
    useEffect(() => {
        if (cartData && isLogin) {
            const countData = cartData?.data?.products?.length || 0;
            setCount(countData);
        } else {
            setCount(0);
        }
    }, [cartData, isLogin]);
    const { mutate: handleDeleteItemCart } = useMutation({
        mutationFn: async (productId: string) => {
            try {
                const res = await instance.delete(`/carts/remove-from-cart/${productId}`)
                if (res.status === 200) {
                    return res.data
                }
            } catch (error: any) {
                console.log(error.response.data.error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["carts"],
            })
        },

    })

    const { mutate: handleDeleteCart } = useMutation({
        mutationFn: async (cartId: string) => {
            try {
                return await instance.delete(`/carts/remove/${cartId}`)
            } catch (error: any) {
                console.log(error.response.data.error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["carts"],
            })
        },
    })
    return {
        cartData,
        count, setCount,
        handleDeleteItemCart,
        handleDeleteCart
    }
}

export default useCart