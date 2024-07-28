import { StatusCodes } from "http-status-codes";
import User from "../models/user";

export const getAllUsers = async (req, res) => {
    try {
        const data = await User.find();
        if (data.length > 0) {
            return res.status(StatusCodes.OK).json(data);
        }
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy người dùng!" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const getMe = async (req, res, next) => {
    req.params.id = req.user._id;
    next();
}

export const getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy người dùng!" });
        data.password = undefined;
        return res.status(StatusCodes.OK).json({
            message: "Lấy thông tin người dùng thành công",
            succes: true,
            data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}