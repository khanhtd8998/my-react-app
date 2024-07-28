import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";

export const findProductInCart = (cart, productId) => {
    return cart.products.find((item) => item.productId.toString() === productId);
};

export const getCartMiddleware = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        req.currentCart = cart;
        next();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
}

// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = async (req, res) => {
    try {
        const user = req.user._id
        const currentCart = req.currentCart
        const { product, quantity, price } = req.body
        if (!currentCart) {
            const newCart = await Cart.create({
                userId: user,
                products: [
                    {
                        product,
                        quantity,
                        price
                    }
                ]

            })
            return res.status(StatusCodes.OK).json({
                status: 'success',
                data: newCart,
                message: 'Added successfully',
            });
        }
        const productExist = currentCart.products.find((item) => item.product == product)
        let newCart = []
        if (productExist) {
            newCart = currentCart.products.map((item) =>
                item.product == product
                    ? { product, quantity: item.quantity + quantity, price }
                    : item
            )
        } else {
            newCart = [...currentCart.products, { product, quantity, price }]
        }
        const cart = await Cart.findOneAndUpdate(
            currentCart._id,
            { products: newCart },
            { new: true }
        )
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: cart,
            message: 'Added successfully',
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
};
// Lấy danh sách sản phẩm thuộc 1 user
export const getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate("products.product").exec();
        if (!cart) return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found", data: [] });
        const cartData = {
            products: cart.products.map((item) => ({
                productId: item.product._id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
                quantity: item.quantity,
            })),
            totalPrice: cart.totalPrice,
            _id: cart._id
        };
        return res.status(StatusCodes.OK).json({
            success: true,
            data: cartData,
            message: "Get cart successfully",
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
};
// Xóa 1 sản phẩm trong giỏ hàng thuộc 1 user
export const removeItemFromCart = async (req, res) => {
    try {
        const idProduct = req.params.id
        const currentCart = req.currentCart
        console.log(currentCart);
        const newCart = currentCart.products.filter((item) => item.product.toString() != idProduct)
        const cart = await Cart.findOneAndUpdate(
            currentCart._id,
            { products: newCart },
            { new: true }
        )
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: cart,
            message: 'Removed successfully',
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
}

export const removeCart = async (req, res) => {
    try {
        const id = req.params.id
        const currentCart = req.currentCart

        const data = await Cart.findByIdAndUpdate({ _id: id }, { $set: { products: [] } }, { new: true })
        return res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Removed successfully',
            data
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }

}

//Xoá hết toàn bộ giỏ hàng
// export const removeFromCart = async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
//         }
//         cart.products = cart.products.filter(
//             (product) => product.productId && product.productId.toString() !== productId
//         );
//         cart.updateTotals();
//         await cart.save();
//         return res.status(StatusCodes.OK).json({ cart });
//     } catch (error) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
//     }
// };
// // Cập nhật số lượng sản phẩm trong giỏ hàng thuộc 1 user
// export const updateProductQuantity = async (req, res) => {
//     const { userId, productId, quantity } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
//         }

//         const product = findProductInCart(cart, productId);
//         if (!product) {
//             return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
//         }
//         product.quantity = quantity;

//         // Tự động cập nhật tổng số lượng và giá
//         cart.updateTotals();
//         await cart.save();
//         return res.status(StatusCodes.OK).json({ cart });
//     } catch (error) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
//     }
// };

// // Tăng số lượng của sản phẩm trong giỏ hàng
// export const increaseProductQuantity = async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const product = cart.products.find((item) => item.productId.toString() === productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }
//         cart.updateTotals(); // Update totals

//         product.quantity++;

//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// // Giảm số lượng của sản phẩm trong giỏ hàng
// export const decreaseProductQuantity = async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const product = cart.products.find((item) => item.productId.toString() === productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }

//         if (product.quantity > 1) {
//             product.quantity--;
//         }
//         cart.updateTotals(); // Update totals

//         await cart.save();
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
