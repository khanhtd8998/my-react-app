import { StatusCodes } from "http-status-codes"
import Order from "../models/order"
import Cart from "../models/cart"


export const createOrderFromCart = async (req, res, next) => {
    try {
        const currentCart = req.currentCart
        const currentUser = req.user
        const products = currentCart.products
        const { name, phone, address, payment } = req.body
        const data = await Order.create({
            user: currentUser._id,
            name,
            phone,
            address,
            payment,
            products: products
        })
        await Cart.findOneAndUpdate({ _id: currentCart._id }, { $set: { products: [] } }, { new: true })
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: data,
            message: "Đặt hàng thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOrderUser = async (req, res, next) => {
    try {
        const id = req.user._id
        const data = await Order.find({ user: id }).populate({
            path: 'products.product',
            select: 'name image'
        }).exec()
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: data,
            message: "Lấy lịch sử đặt hàng thành công"
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });

    }
}