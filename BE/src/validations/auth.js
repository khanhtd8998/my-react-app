import Joi from "joi";
export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).messages({
        "string.min": "Trường Name phải có ít nhất {#limit} ký tự",
        "string.max": "Trường Name không được vượt quá {#limit} ký tự",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Trường Email là bắt buộc",
        "string.empty": "Trường Email không được để trống",
        "string.email": "Trường Email phải là email hợp lệ",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "any.required": "Trường Password là bắt buộc",
        "string.empty": "Trường Password không được để trống",
        "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
        "string.max": "Trường Password không được vượt quá {#limit} ký tự",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        // "any.required": "Trường Confirm Password là bắt buộc",
        "any.only": "Mật khẩu không trùng khớp",
        "string.empty": "Trường Confirm Password là bắt buộc",
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Trường Avatar phải là đường dẫn hợp lệ",
    }),
});

export const loginScheme = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Trường Email là bắt buộc",
        "string.empty": "Trường Email không được để trống",
        "string.email": "Trường Email phải là email hợp lệ",
    }),
    password: Joi.string().required().messages({
        "any.required": "Trường Password là bắt buộc",
        "string.empty": "Trường Password không được để trống",
        // "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
        // "string.max": "Trường Password không được vượt quá {#limit} ký tự",
    }),
});