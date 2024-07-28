import User from "../models/user";
import BlacklistedToken from "../models/black-list-token";
import { StatusCodes } from "http-status-codes";
import { signupSchema, loginScheme } from "../validations/auth";
import bcryptjs from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../ultils/jwt";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                messages,
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Email đã đăng ký",
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
        const user = await User.create({
            ...req.body,
            password: hashPassword,
            role,
        })
        user.password = undefined;
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Đăng ký thành công!",
            user
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = loginScheme.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                messages,
            });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Email không tồn tại"
        })

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Mật khẩu không chính xác"
        })
        const token = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        user.password = undefined;
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Đăng nhập thành công",
            data: user,
            token,
            refreshToken
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "No token provided" });
        }
        const blacklistedToken = new BlacklistedToken({ token });
        await BlacklistedToken.save();

        res.status(StatusCodes.OK).json({ message: "Successfully logged out" });
    } catch (error) {
        console.error(`Error during logout:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
};


export const isTokenBlacklisted = async (token) => {
    const tokenInBlacklist = await BlacklistedToken.findOne({ token });
    return !!tokenInBlacklist;
};
export const refreshToken = async (req, res) => {
    try {
        const oldToken = req.headers.authorization;
        if (!oldToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "No token provided" });
        }

        const isBlacklisted = await isTokenBlacklisted(oldToken);
        if (isBlacklisted) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token is blacklisted" });
        }

        let decoded;
        try {
            decoded = verifyToken(oldToken);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token expired" });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
            }
        }

        const userId = decoded.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid token payload" });
        }

        // Tạo refreshToken mới
        const newToken = generateRefreshToken(userId);

        // Trả về refreshToken mới cho client
        res.status(StatusCodes.OK).json({ newToken });
    } catch (error) {
        console.error(`Error during token refresh:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};