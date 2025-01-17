import { StatusCodes } from "http-status-codes";
import Product from "../models/product";
import Cart from "../models/cart";

export const create = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        return res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getAllProducts = async (req, res) => {

    try {
        const result = await Product.find().populate({
            path: "category",
            select: "name _id",
        })
        // if (result.length === 0) throw new Error("No products found");

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: "category",
            select: "name _id",
        });
        if (product.length === 0)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy sản phẩm nào!" });
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};


export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        await Cart.updateMany(
            {},
            { $pull: { products: { product: req.params.id } } }
        );
        return res.status(StatusCodes.OK).json({ success: true, data: product });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
export const updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const related = async (req, res) => {
    try {
        const product = await Product.find({
            category: req.params.categoryId,
            _id: { $ne: req.params.productId },
        });
        return res.status(StatusCodes.OK).json(product);
    } catch (error) { }
};

// iphone 13 product max => /product/iphone-13-product-max
// GET /product/:slug
