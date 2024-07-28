import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
        },
        discount: {
            type: Number,
            default: 0,
        },
        finalPrice: {
            type: Number,
        },
    },
    { _id: false }
);

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [cartItemSchema],
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})




cartSchema.virtual('totalPrice').get(function () {
    return this.products.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);
});

export default mongoose.model("Cart", cartSchema);