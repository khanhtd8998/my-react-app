import useCart from "@/common/hooks/useCart"
import { User } from "@/common/types/user"
import instance from "@/configs/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type AuthContextProps = {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    login: (formData: { email: string; password: string }) => void
    contextHolder: any,
    user: User | null,
    handleLogout: () => void
}
const AuthContext = createContext({} as AuthContextProps)
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const nav = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [messageApi, contextHolder] = message.useMessage()
    const token = localStorage.getItem('accessToken')
    // const queryClient = useQueryClient()
    useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await instance.get("/auth/get-me")
            setUser(res.data.data)
            return res.data.data
        },
        enabled: !!token
    })
    useEffect(() => {
        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    })
    const { mutate: login } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await instance.post('/auth/signin', formData)
            return data
        },
        onSuccess: (data: any) => {
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem('user', JSON.stringify(data.data))
            setUser(data.data)
                ;
            nav('/')
            messageApi.open({
                type: 'success',
                content: `${data.message}`
            })
        },
        onError: (error: any) => {
            messageApi.open({
                type: 'error',
                content: `${error?.response.data.message}`
            })
        }
    })
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        setIsLogin(false)
        setUser(null)
        nav('/')
    }
    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, login, contextHolder, user, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}