// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';

// interface CustomRequest extends Request {
//   user?: any;
// }

// export const authMiddleware = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Token headerdan olinadi
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'Autentifikatsiya talab qilinadi' });
//     }

//     // Tokenni tekshirish
//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     // Decoded ma'lumotlarni requestga qo'shish
//     req.user = decoded;
    
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Noto'g'ri token' });
//   }
// }; 