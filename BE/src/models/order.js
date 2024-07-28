import mongoose from "mongoose";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};

const orderItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    payment: {
        type: String,
        enum: ["cod", "paypal"],
        default: "cod",
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
});


orderSchema.virtual('totalOrder').get(function () {
    return this.products.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);
});
orderSchema.virtual("orderNumber").get(function () {
    const data = generateOrderNumber()
    return data
})
export default mongoose.model("Order", orderSchema);
