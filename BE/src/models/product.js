import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Cart from "./cart";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            // lowercase: true,
        },
        slug: {
            type: String,
            // unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
        },
        gallery: {
            type: Array,
        },
        description: {
            type: String,
        },
        discount: {
            type: Number,
            default: 0,
        },
        countInStock: {
            type: Number,
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        tags: {
            type: Array,
        },

    },
    { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
