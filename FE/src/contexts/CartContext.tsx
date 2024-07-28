import { Cart } from "@/common/types/cart"
import { createContext, useContext, useState } from "react"

type CartContextProps = {
    carts: Cart | null
}
const CartContext = createContext({} as CartContextProps)

const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within an CartProvider')
    }
    return context
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [carts, setCarts] = useState<Cart | null>(null)

    return (
        <CartContext.Provider value={{ carts }}>
            {children}
        </CartContext.Provider>
    )
}