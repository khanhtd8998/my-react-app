import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import { verifyToken } from "../ultils/jwt";
// export const checkAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized" });
//         }
//         const user = jwt.verify(token, "123456", async (error, decoded) => {
//             if (error.name === "TokenExpiredError") {
//                 return res.status(401).json({ error: "Hết hạn token" });
//             }
//             if (error.name === "JsonWebTokenError") {
//                 return res.status(401).json({ error: "Token không hợp lệ" });
//             }
//             return await User.findOne({ _id: decoded.userId });
//         });
//         if (user.role !== "admin") {
//             return res.status(401).json({ error: "Unauthorized" });
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// };

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
        }
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token invalid or token expired",
            });
        }

        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ error: 'User not found' });
        user.password = undefined
        req.user = user;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication failed' });
    }
}