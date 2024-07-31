import { Category } from "./category"

export type Product = {
    _id?: string
    name: string
    category?: {
        _id: string
        name: string
    }
    slug?: string,
    price: number
    quantity?: number,
    image?: string
    description?: string
    discount?: number
    featured?: boolean
    countInStock?: number
    creatAt?: string
}
export type ProductResponse = Omit<Product, 'category'> & {
    category: Category;
    _id?: string
};
