import { StatusCodes } from "http-status-codes"
import Order from "../models/order"
import Cart from "../models/cart"

export const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};

export const createOrderFromCart = async (req, res, next) => {
    try {
        const currentCart = req.currentCart
        const currentUser = req.user
        const products = currentCart.products
        const { name, phone, address, payment } = req.body
        const orderNumber = generateOrderNumber()
        const data = await Order.create({
            user: currentUser._id,
            name,
            phone,
            address,
            payment,
            orderNumber,
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
        if (data.length == 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: [],
                message: "Không có lịch sử đặt hàng"
            })
        }
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: data,
            message: "Lấy lịch sử đặt hàng thành công"
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });

    }
}

export const getOrderById = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Order.find({ _id: id }).populate({
            path: 'products.product',
            select: 'name image'
        }).exec()
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: data,
            message: "Lấy đơn hàng thành công"
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });

    }
}