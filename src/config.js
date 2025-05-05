import "dotenv/config";

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI;
