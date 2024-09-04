import { ApiError } from "../utils/apiError.js";
// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        // Send JSON response with the custom error properties
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            error: err.error,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }

    // Handle other types of errors or fallback
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorMiddleware;
