export type Order = {
    _id: string;
    user: string;
    name: string,
    address: string,
    phone: string,
    products: [{
        product: {
            _id: string,
            name: string
            image: string
        }
        quantity: number,
        price: number
    }],
    payment: string,
    orderNumber: string,
    totalOrder: number
}