import { Router } from "express";
import {
    addItemToCart,
    getCartByUserId,
    getCartMiddleware,
    removeCart,
    removeItemFromCart,
    updateQuantityCart,
    // decreaseProductQuantity,
    // increaseProductQuantity,
    // removeFromCart,
    // updateProductQuantity,
} from "../controllers/cart";
import { authMiddleware } from "../middleware/checkAuth";

const cartRouter = Router();
cartRouter.use('/', authMiddleware, getCartMiddleware)
cartRouter.get("/carts", getCartByUserId);
cartRouter.post("/carts/add-to-cart", addItemToCart);
cartRouter.patch("/carts/update-quantity", updateQuantityCart);
cartRouter.delete("/carts/remove-from-cart/:id", removeItemFromCart);
cartRouter.delete("/carts/remove/:id", removeCart);

// Cập nhật số lượng của sản phẩm trong giỏ hàng từ input
// cartRouter.post("/carts/update", updateProductQuantity);
// // Xóa item trong giỏ hàng
// cartRouter.post("/carts/remove", removeFromCart);
// // Tăng số lượng của sản phẩm trong giỏ hàng
// cartRouter.post("/carts/increase", increaseProductQuantity);
// // Giảm số lượng của sản phẩm trong giỏ hàng
// cartRouter.post("/carts/decrease", decreaseProductQuantity);

export default cartRouter;
