import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = async (userDetails) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const token = await jwt.sign(userDetails, secretKey, { expiresIn: '12hr'})
    return token;
  } catch (error) {
    return error;
  }
}

export const verifyToken = () => {
  
}