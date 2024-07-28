import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateRefreshToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};
export const generateAccessToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}