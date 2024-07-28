export type Cart = {
    _id: string
    userId: string
    totalPrice: number
    products: {
        _id: string
        productId: string
        quantity: number
        price: number
    }
}